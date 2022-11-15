import { Button, Container, Stack } from "react-bootstrap";
import { BudgetCard } from "./Components";

function App() {
  return (
    <Container className="my-4">
      <Stack direction="horizontal" gap="2" className="mb-4">
        <h1 className="me-auto">Budgets</h1>
        <Button variant="primary">Add Budget</Button>
        <Button variant="outline-primary">Add Expense</Button>
      </Stack>

      <div style={
        {
          display:"grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
          gap: "1rem", 
          alignItems: "flex-start"
        }}
        >
          < BudgetCard
          name="Entertainement" 
          amount ={1200} 
          max ={1000} />

          < BudgetCard
          name="Entertainement" 
          gray
          amount ={1200} 
          max ={1000} />
        </div>

    </Container>
  );
}

export default App;
