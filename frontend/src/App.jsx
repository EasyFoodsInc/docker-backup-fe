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

  const loadAll = async () => {
    setSystem((await api.get("/system")).data)
    setConfig((await api.get("/config")).data)
    setContainers((await api.get("/containers")).data)
  }

  useEffect(()=>{
    loadAll()
  },[])

  return (
    <div className="p-4">

      <div className="flex justify-content-between align-items-center mb-3">

        <HostHeader system={system}/>

        <Button
          icon="pi pi-refresh"
          label="Refresh"
          onClick={loadAll}
        />

      </div>

      <ConfigAccordion config={config}/>

      <ContainersTable containers={containers} config={config}/>

    </div>
  )
}
