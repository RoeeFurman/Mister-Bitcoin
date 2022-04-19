import { Component } from 'react'
import { BitcoinApp } from './pages/BitcoinApp';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader';
import { About } from './pages/About';
import { userService } from './services/userService';
import { Redirect } from 'react-router-dom';
import { ContactPage } from './pages/ContactPage';
import { ContactEdit } from './pages/ContactEdit';
import { ContactDetailsPage } from './pages/ContactDetailsPage';
import { StatisticsPage } from './pages/StatisticsPage';
import './assets/scss/global.scss'

function App() {

  const PrivateRoute = (props) => {
    const user = userService.getUser()
    return user ? <Route {...props} /> : <Redirect to='/' />
  }

  return (

    <Router>
      <div className="app">
        <AppHeader />
        <div className='container'>

          <Switch>
            <PrivateRoute path="/contact/edit/:id?" component={ContactEdit} />
            <PrivateRoute path="/contact/:id" component={ContactDetailsPage} />
            <PrivateRoute path="/about" component={About} />
            <PrivateRoute path="/contact" component={ContactPage} />
            <PrivateRoute path="/statistic" component={StatisticsPage} />
            <Route path="/" component={BitcoinApp} />
          </Switch>
        </div>
      </div >
    </Router>

  )
}
export default App;
