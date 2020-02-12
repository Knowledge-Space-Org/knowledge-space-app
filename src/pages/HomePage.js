import React, { Component } from 'react'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import Fab from '@material-ui/core/Fab';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Autosuggest from 'features/autosuggest/Autosuggest'

import hbp from 'imgs/hbp-logo.png';
import nif from 'imgs/nif-logo.png';
import incf from 'imgs/incf-logo.svg';

import ebrains from 'imgs/partners/ebrains.svg';
import brainmaps from 'imgs/partners/brainmaps.png';
import neuromorpho from 'imgs/partners/neuromorpho.png';
import opensourcebrain from 'imgs/partners/opensourcebrain.png';
import icg from 'imgs/partners/icg.png';
import pubmed from 'imgs/partners/pubmed.png';
import neurolex from 'imgs/partners/neurolex.png';
import modeldb from 'imgs/partners/modeldb.png';
import gensat from 'imgs/partners/gensat.png';
import neurondb from 'imgs/partners/neurondb.png';
import neuroelectro from 'imgs/partners/neuroelectro.png';
import bbp from 'imgs/partners/bbp.png';
import cli from 'imgs/partners/cli.png';
import allen from 'imgs/partners/allen.png';

import banner from 'imgs/ks-banner.png';
import AliceCarousel from 'react-alice-carousel'
import "react-alice-carousel/lib/alice-carousel.css";

const partner_logos = [
  {
    href: 'http://portal.brain-map.org/',
    name: 'Allen Brain Map',
    src: allen
  },
  {
    href: 'http://neuromorpho.org/',
    name: 'Neuromorpho',
    src: neuromorpho
  },
  {
    href: 'http://www.opensourcebrain.org/',
    name: 'Open Source Brain',
    src: opensourcebrain
  },
  {
    href: 'https://icg.neurotheory.ox.ac.uk/',
    name: 'IonChannelGenealogy',
    src: icg
  },
  {
    href: 'https://www.ncbi.nlm.nih.gov/pubmed',
    name: 'PubMed',
    src: pubmed
  },
  {
    href: 'http://neurolex.org',
    name: 'NeuroLex',
    src: neurolex
  },
  {
    href: 'https://senselab.med.yale.edu/ModelDB/',
    name: 'ModelDB',
    src: modeldb
  },
  {
    href: 'http://www.gensat.org/daily_showcase.jsp',
    name: 'GENSAT',
    src: gensat
  },
  {
    href: 'https://senselab.med.yale.edu/neurondb',
    name: 'NeuronDB',
    src: neurondb
  },
  {
    href: 'https://neuroelectro.org/',
    name: 'NeuroElectro',
    src: neuroelectro
  },
  {
    href: 'https://bluebrain.epfl.ch/',
    name: 'Blue Brain Project',
    src: bbp
  },
  {
    href: 'http://cellimagelibrary.org/',
    name: 'Cell Image Library',
    src: cli
  },
  {
    href: 'http://brainmap.org/',
    name: 'BrainMaps',
    src: brainmaps
  },
  {
    href: 'https://ebrains.eu/',
    name: 'EBRAINS',
    src: ebrains
  }
];

const sortLogos = (logos) => {
  return logos.sort((c1, c2) => {
    return c1.name.toLowerCase() > c2.name.toLowerCase() ? 1 : -1;
  });
}

const logos = sortLogos(partner_logos);


const styles = theme => ({
  title: {
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      fontSize: theme.typography.h4.fontSize,
    },
  },
  inputRoot: { paddingRight: '10px', width: '100%' },
  inputInput: {
    fontSize: theme.typography.h5.fontSize,

  },
  SearchInput: {
    padding: '5px 10px',
    border: '1px solid #626262'
  },
  searchAreaWrapper:{
    marginTop:'30px',
  },
  searchContainer: {
    // margin: '20px 0'
    paddingTop: '20px',
    width: '100%'
  },
  searchSubtitle: {
    paddingTop: '15px',
    color: '#005995',
  },
  dataSourceText:{
    color: '#626262',
  },
  introText: {
    paddingLeft: '20px',
    paddingTop:'20px',
    color: '#626262',
  },
  bannerParent:{
    position:'relative',
  },
  bannerImg: {
    height: '300px',
    width: '100%',
  },
  searchIcon: {
    fontSize: theme.typography.h4.fontSize,
    width: '72px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  autoCompleteResult:{
    padding:'0 300px', //same as input box
    marginTop: '-7px',
    margingLeft:'1px'
  },
  suggestBox: {
    zIndex: 1,
    marginTop: theme.spacing.unit,
    zIndex: 1
  },
  searchButton: {
    backgroundColor: '#005995',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#005995',
      color: '#fff',
      opacity: '0.8',
    },
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    // boxShadow: theme.shadows[3],
    // '&:hover': {
    //   boxShadow: theme.shadows[5],
    //   backgroundColor: fade(theme.palette.common.white, 0.25)
    // },
    margingTop:'30px',
    width: '100%'
  },
  logoContainer: {
    marginTop: '125px',
    [theme.breakpoints.up('sm')]: {
      minWidth: '500px'
    }
  },
  logo: {
    paddingLeft: '25px',
    paddingRight:'25px',
    marginTop:'18px',
    // minWidth: 100
    height:'50px',
    marginBottom:'0',
  },
  dataSourcesLogoContainer: {
    marginTop: '125px',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  overlayIntro:{
    position:'absolute',
    top:0,
    left:0,
  },
  dataSources: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    marginTop: 150
  },
  dataSourceLogo: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  imgFullHeight: {
    left: 'auto',
    height: 50,
    width: 149,
    position: 'static',
    transform: 'none'
  },
  gridListRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',

    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    scrollBehavior: 'smooth'
  },
  tile: {
    width: 149
  },
  tileTitle: {
    wordBreak: 'break-word',
    overflow: 'unset',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.button.fontSize,
    },
    color: theme.palette.common.black,
    '&:hover': { cursor: 'pointer' }
  },
  tileBar: {
    backgroundColor: '#e0e0e0'
  },
  partnerInfo: {
    justifyContent: 'flex-end'
  },
  copyrightText: {
    justifyContent: 'center',
    color: '#626262',
  },
  partnerText: {
    justifyContent: 'center',
    color: '#626262',
    paddingTop:'5px',
    marginRight:'150px',
  },
  footer: {
    borderTop: '1px solid #ddd',
    marginTop: '70px',
    bottom: 0,
    width: '100%',
  }
});

class HomePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props

    const iconScrollerLeft = ({ target }) => {
      const list = document.getElementById('scrollBar').querySelector('ul');
      list.scrollLeft -= 600;
    }

    const iconScrollerRight = ({ target }) => {
      const list = document.getElementById('scrollBar').querySelector('ul');
      list.scrollLeft += 600;
    }

    const responsive = {
      0: {
        items: 1,
      },
      1024: {
        items: 5
      }
    }


    return (
      <Grid container className="my-home" >
        <Grid xs={12} item className={classes.bannerParent} >
          <div className={classes.overlayIntro}>
            <Typography className={classes.introText} align="left" variant="h5" gutterBottom>A community encyclopedia linking brain research concepts to data, models, and literature.</Typography>
          </div>
          <img src={banner} className={classes.bannerImg} />
        </Grid>
        <Grid container className={classes.searchAreaWrapper} justify="center" alignItems="center" item xs={12}>
          <div className={classes.searchContainer}>
            <Autosuggest classes={classes} history={this.props.history} />
          </div>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography className={classes.searchSubtitle} variant="subtitle1" gutterBottom>Over 1678580 pieces of data collected from 14 sources.</Typography>
        </Grid>
        <Grid container direction="row" alignItems='center' justify="flex-start" classes={{ container: classes.dataSources }}>
          <Grid item xs={12}>
            <Typography variant="h4" className={classes.dataSourceText} gutterBottom>Data Sources</Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="flex-start">

          <AliceCarousel autoPlay autoPlayInterval={2000} dotsDisabled buttonsDisabled responsive={responsive}>
            {logos.map(logo => (
              <div key={logo.src}>
                <img onClick={() => window.open(logo.href)} alt={logo.name} src={logo.src} className={classes.dataSourceLogo} />
              </div>
            ))
            }
          </AliceCarousel>

        </Grid>

        <Grid item className={classes.footer} xs={12}>
          <Grid item xs={12} container direction='column' alignItems='center'>
            <Grid container item xs={12} alignItems="flex-start"  justify="flex-end" direction="row">
              <Typography className={classes.partnerText} gutterBottom variant='subtitle'>In collaboration with</Typography>
            </Grid>
            <Grid className={classes.partnerInfo} container direction="row" alignItems='center'>
              <Grid item>
                <a href='https://humanbrainproject.eu/'>
                  <img alt='HBP' className={classes.logo} src={hbp} />
                </a>
              </Grid>
              <Grid item>
                <a href='https://www.neuinfo.org'>
                  <img alt='NIF' className={classes.logo} src={nif} />
                </a>
              </Grid>
              <Grid item>
                <a href='https://www.incf.org'>
                  <img alt='INCF' className={classes.logo} src={incf} />
                </a>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.copyrightText} container alignItems='center'>
            <Typography className={classes.copyrightText} gutterBottom>Copyright 2020 KnowledgeSpace.org</Typography>
          </Grid>
        </Grid>
      </Grid >
    )
  }
}

const mapStateToProps = ({ entitySearch }) => {
  return { ...entitySearch }
}

export default withStyles(styles)(connect(mapStateToProps)(HomePage))
