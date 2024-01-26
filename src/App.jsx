import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { EventsPage } from "./pages/EventsPage";
import { EventPage } from "./pages/EventPage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={EventsPage} />
        <Route path="/events/:eventId" component={EventPage} />
      </Switch>
    </Router>
  );
};

export default App;
