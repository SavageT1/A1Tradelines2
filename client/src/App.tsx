import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import BuyTradelines from "./pages/BuyTradelines";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import BestTradelinesForSale from "./pages/BestTradelinesForSale";
import AuthorizedUserTradelines from "./pages/AuthorizedUserTradelines";
import HowToBoostCreditScore from "./pages/HowToBoostCreditScore";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Disclaimer from "./pages/Disclaimer";
import Layout from "./components/Layout";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/buy-tradelines" component={BuyTradelines} />
        <Route path="/faq" component={FAQ} />
        <Route path="/blog" component={Blog} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/disclaimer" component={Disclaimer} />
        <Route path="/best-tradelines-for-sale" component={BestTradelinesForSale} />
        <Route path="/authorized-user-tradelines" component={AuthorizedUserTradelines} />
        <Route path="/how-to-boost-credit-score-fast" component={HowToBoostCreditScore} />
        <Route path="/resources/faq-hub"><Redirect to="/faq" /></Route>
        <Route path="/resources/:rest*"><Redirect to="/faq" /></Route>
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
