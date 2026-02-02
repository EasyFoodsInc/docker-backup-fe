import { useEffect, useState } from "react"
import { Button } from "primereact/button"

import HostHeader from "./components/HostHeader"
import ContainersTable from "./components/ContainersTable"
import ConfigAccordion from "./components/ConfigAccordion"

import { api } from "./api"

export default function App() {

  const [system,setSystem] = useState({})
  const [config,setConfig] = useState({})
  const [containers,setContainers] = useState([])
  const [status,setStatus] = useState({})
  const [statusDetailed,setStatusDetailed] = useState({})

  const loadAll = async () => {
    try {
      const s = await api.get("/system")
      const c = await api.get("/config")
      const ct = await api.get("/containers")
      const rs = await api.get("/status")
      const rsd = await api.get("/status_detailed")

      console.log("SYSTEM:", s.data)
      console.log("CONFIG:", c.data)
      console.log("CONTAINERS:", ct.data)
      console.log("STATUS:", rs.data)
      console.log("STATUS DETAILED:", rsd.data)
      setSystem(s.data)
      setConfig(c.data)
      setContainers(ct.data)
      setStatus(rs.data)
      setStatusDetailed(rsd.data)

    } catch (err) {
      console.error("API ERROR:", err)
    }
  }

  useEffect(()=>{
    loadAll()
  },[])

  return (
    <div className="p-4">

      <div className="flex justify-content-between align-items-center mb-6 gap-3">

        <HostHeader system={system}/>

        <Button
          icon="pi pi-refresh"
          label="Reload"
          onClick={loadAll}
          size="small"
        />

      </div>

      <ConfigAccordion config={config}/>

      <ContainersTable containers={containers} config={config}/>

    </div>
  )
}
