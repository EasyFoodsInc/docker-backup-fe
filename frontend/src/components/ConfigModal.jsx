import { Dialog } from "primereact/dialog"

export default function ConfigModal({ visible, onHide, data }) {

  if (!data) return null

  return (
    <Dialog
      header="Backup Configuration"
      visible={visible}
      style={{ width: "600px" }}
      onHide={onHide}
    >

      <pre style={{ background: "#111", color: "#0f0", padding: "10px" }}>
        {Object.entries(data).map(([k,v]) =>
          `${k}=${v}\n`
        )}
      </pre>

    </Dialog>
  )
}
