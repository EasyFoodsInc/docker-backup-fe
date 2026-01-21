import { useState } from "react"

import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Tag } from "primereact/tag"
import { Button } from "primereact/button"

import ConfigModal from "./ConfigModal"
import FilesModal from "./FilesModal"

import { api } from "../api"

export default function ContainersTable({ containers, config }) {

  const [cfgModal,setCfgModal] = useState(false)
  const [filesModal,setFilesModal] = useState(false)

  const [selectedConfig,setSelectedConfig] = useState(null)
  const [fileStats,setFileStats] = useState(null)

  const openConfig = (name) => {
    setSelectedConfig(config[name])
    setCfgModal(true)
  }

  const openFiles = async (name) => {
    const res = await api.get(`/backups/${name}`)
    setFileStats(res.data)
    setFilesModal(true)
  }

  const statusTemplate = (row) => {
    if(row.deleted) return <Tag severity="danger" value="DELETED"/>
    if(!row.in_config) return <Tag severity="warning" value="NO CONFIG"/>
    if(!row.cleared) return <Tag severity="info" value="NOT CLEARED"/>
    return <Tag severity="success" value="OK"/>
  }

  return (
    <>
      <DataTable value={containers} paginator rows={10}>

        <Column field="name" header="Container"/>

        <Column body={statusTemplate} header="Status"/>

        <Column
          header="Config"
          body={(row)=>
            row.in_config &&
            <Button
              icon="pi pi-cog"
              text
              onClick={()=>openConfig(row.name)}
            />
          }
        />

        <Column
          header="Files"
          body={(row)=>
            row.in_config &&
            <Button
              icon="pi pi-folder"
              text
              onClick={()=>openFiles(row.name)}
            />
          }
        />

      </DataTable>

      <ConfigModal
        visible={cfgModal}
        onHide={()=>setCfgModal(false)}
        data={selectedConfig}
      />

      <FilesModal
        visible={filesModal}
        onHide={()=>setFilesModal(false)}
        stats={fileStats}
      />

    </>
  )
}
