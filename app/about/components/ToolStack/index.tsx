import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionGroup from '@mui/joy/AccordionGroup';
import AccordionSummary from '@mui/joy/AccordionSummary';

export default async function About() {

  return (
    <AccordionGroup
      color="primary"
      variant="plain"
      size="lg"
    >
      <Accordion>
        <AccordionSummary>Next.js&TailwindCSS</AccordionSummary>
        <AccordionDetails>Next.js&TailwindCSS</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Postgres</AccordionSummary>
        <AccordionDetails>Postgres</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Prisma</AccordionSummary>
        <AccordionDetails>Prisma</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Auth.js</AccordionSummary>
        <AccordionDetails>Auth.js</AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
}
