import { Dialog } from "primereact/dialog"
import { Tree } from "primereact/tree"

export default function FilesModal({ visible, onHide, stats }) {

  if (!stats) return null

  const tree = stats.files.map((f,i)=>({
    key: i,
    label: f
  }))

  return (
    <Dialog
      header="Backup Files"
      visible={visible}
      style={{ width: "600px" }}
      onHide={onHide}
    >

      <p><b>Total:</b> {stats.files.length}</p>
      <p><b>Full:</b> {stats.full}</p>
      <p><b>Diff:</b> {stats.diff}</p>
      <p><b>Incremental:</b> {stats.incr}</p>

      <Tree value={tree}/>

    </Dialog>
  )
}
