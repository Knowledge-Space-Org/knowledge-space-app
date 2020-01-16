import { toString, omitBy, isEmpty, has, map, flatten } from 'lodash'
import { esclient, API_END_POINT } from './ESClient'
import { filterBuilder, combineAggsAndFilters } from './utils'
import axios from 'axios';


export const search = ({ q = '' }) => {

  const body = {
    'suggest': {
      'suggestions': {
        'prefix': q,
        'completion': {
          'field': 'suggestions',
          'skip_duplicates': true
        }
      }
    }
  }

  // return esclient.search({
  //   index: 'scigraph',
  //   type: 'entities',
  //   body
  // }).then(response => {
  //   const suggestions = flatten(response.suggest.suggestions.map(suggestion => {
  //     return suggestion.options.map( o => ({ name: o.text, slug: o._id }))
  //   }));
  //   return { q, suggestions }
  // })

  return axios.get(API_END_POINT + 'entity/auto-suggest', { params: { body } }).then(res => {
    console.debug("response return from server");
    console.debug(res);
    const response = res.data;
    const suggestions = flatten(response.suggest.suggestions.map(suggestion => {
      return suggestion.options.map(o => ({ name: o.text, slug: o._id }))
    }));
    return { q, suggestions }
  });
}
