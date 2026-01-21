import { Accordion, AccordionTab } from "primereact/accordion"

export default function ConfigAccordion({ config }) {

  if (!config.master_params) return null

  return (
    <Accordion className="mb-3">

      <AccordionTab header="Main Backup Configuration">

        {Object.entries(config.master_params).map(([k,v]) => (
          <div key={k} className="mb-2">
            <b>{k}</b>: {v}
          </div>
        ))}

      </AccordionTab>

    </Accordion>
  )
}
