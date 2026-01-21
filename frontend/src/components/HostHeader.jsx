import { useState } from "react"
import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button"

export default function HostHeader({ system }) {

  const [visible,setVisible] = useState(false)

  return (
    <div className="flex align-items-center gap-2">

      <h2>{system.hostname || "Loading..."}</h2>

      <Button
        icon="pi pi-info-circle"
        text
        onClick={() => setVisible(true)}
      />

      <Dialog
        header="Host Information"
        visible={visible}
        style={{ width: "400px" }}
        onHide={() => setVisible(false)}
      >
        <p><b>IP:</b> {system.ip}</p>
        <p><b>CPU:</b> {system.cpu_percent}%</p>
        <p><b>Cores:</b> {system.cores}</p>
        <p><b>RAM:</b> {system.ram_gb} GB</p>
        <p><b>Free Disk:</b> {system.free_disk_gb} GB</p>
      </Dialog>

    </div>
  )
}
