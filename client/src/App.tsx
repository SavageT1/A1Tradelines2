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
import ThankYou from "./pages/ThankYou";
import BestTradelinesForSale from "./pages/BestTradelinesForSale";
import AuthorizedUserTradelines from "./pages/AuthorizedUserTradelines";
import HowToBoostCreditScore from "./pages/HowToBoostCreditScore";
import HowItWorks from "./pages/HowItWorks";
import TradelineBuyersGuide from "./pages/TradelineBuyersGuide";
import TradelineGlossary from "./pages/TradelineGlossary";
import BuyAuthorizedUserTradelines from "./pages/BuyAuthorizedUserTradelines";
import TradelinesForSale from "./pages/TradelinesForSale";
import SeasonedTradelines from "./pages/SeasonedTradelines";
import BestTradelinesForCreditUtilization from "./pages/BestTradelinesForCreditUtilization";
import TradelinePostingTimeline from "./pages/TradelinePostingTimeline";
import AreTradelinesLegal from "./pages/AreTradelinesLegal";
import TradelinesBusinessFunding from "./pages/TradelinesBusinessFunding";
import TradelineAssessment from "./pages/TradelineAssessment";
import NonPostingPolicy from "./pages/NonPostingPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Disclaimer from "./pages/Disclaimer";
import BrokerProgram from "./pages/BrokerProgram";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

function Router() {
  return (
    <Layout>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/buy-tradelines" component={BuyTradelines} />
        <Route path="/faq" component={FAQ} />
        <Route path="/blog" component={Blog} />
        <Route path="/contact" component={Contact} />
        <Route path="/thank-you" component={ThankYou} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/disclaimer" component={Disclaimer} />
        <Route path="/broker-program" component={BrokerProgram} />
        <Route path="/non-posting-policy" component={NonPostingPolicy} />
        <Route path="/best-tradelines-for-sale" component={BestTradelinesForSale} />
        <Route path="/authorized-user-tradelines" component={AuthorizedUserTradelines} />
        <Route path="/how-to-boost-credit-score-fast" component={HowToBoostCreditScore} />
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/tradeline-buyers-guide" component={TradelineBuyersGuide} />
        <Route path="/tradeline-glossary" component={TradelineGlossary} />
        <Route path="/tradeline-assessment" component={TradelineAssessment} />
        <Route path="/buy-authorized-user-tradelines" component={BuyAuthorizedUserTradelines} />
        <Route path="/tradelines-for-sale" component={TradelinesForSale} />
        <Route path="/seasoned-tradelines" component={SeasonedTradelines} />
        <Route path="/best-tradelines-for-credit-utilization" component={BestTradelinesForCreditUtilization} />
        <Route path="/how-long-do-tradelines-take-to-post" component={TradelinePostingTimeline} />
        <Route path="/are-tradelines-legal" component={AreTradelinesLegal} />
        <Route path="/can-tradelines-help-business-funding" component={TradelinesBusinessFunding} />
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
