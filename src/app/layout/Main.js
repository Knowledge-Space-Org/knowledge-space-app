import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import HomePage from 'pages/HomePage'
import EntityPage from 'pages/EntityPage'
import SearchPage from 'pages/SearchPage'
import DataSpacePage from 'pages/DataSpacePage'
import LiteraturePage from 'pages/LiteraturePage'
import AboutPage from 'pages/AboutPage'
import WikiPage from 'pages/WikiPage'
import ContactPage from 'pages/ContactPage'
import DocumentationPage from 'pages/DocumentationPage'
import GraphPage from '../../pages/GraphPage'

const styles = theme => ({
  root: {
    marginBottom: '100px',
    paddingLeft: '40px',
    paddingRight: '72px',
    flex: '1 1 100%',
    paddingTop: '80px'
  }
})

const Main = props => {
  const { classes } = props
  return (
    <main className={classes.root}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/contact" component={ContactPage} />
        <Route exact path="/documentation" component={DocumentationPage} />
        <Route exact path="/t/:slug" component={EntityPage} />
        <Route exact path="/wiki/" component={WikiPage} />
        <Route exact path="/wiki/:#slug" component={EntityPage} />
        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/wiki/:slug/dataspace/:source" component={DataSpacePage} />
        <Route exact path="/wiki/:slug/literature" component={LiteraturePage} />
        <Route exact path="/wiki/:curie" component={WikiPage} />
        <Route exact path="/brain-regions" component={GraphPage} />
      </Switch>
    </main>
  )
}
export default withStyles(styles)(Main)
