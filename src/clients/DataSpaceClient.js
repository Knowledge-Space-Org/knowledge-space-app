import { toString, head, isNull, omitBy, isEmpty, isArray, has, keys, map, flatten } from 'lodash'
import { DATASPACE_SOURCES } from 'features/dataSpace/dataSpaceConstants'
import { API_END_POINT } from './ESClient'
import { filterBuilder } from './utils'
import axios from 'axios';
const queryString = (labels) => {
  if (labels.length > 1) {
    return labels.map(label => `(${label})`).join(' OR ');
  } else {
    return head(labels);
  }
}

export const queryAllByEntity = ({ labels }) => {
  if (isNull(labels)) {
    return {}
  }

  const query = queryString(labels)

  const body = {
    size: 0,
    query: {
      query_string: { query }
    },
    aggs: {
      sources: {
        terms: {
          field: '_index',
          size: 20
        }
      }
    }
  }
  // const request = esclient.search({
  //   index: '*',
  //   type: 'dataSpace',
  //   body
  // }).then(response => response.aggregations.sources.buckets)

  return axios.get(API_END_POINT + 'entity/all-data-by-entity', { params: { body } }).then(res => {
    console.debug("response return from server all-data-by-entity");
    console.debug(res.data);
    const response = res.data;
    return response.aggregations.sources.buckets
  });
}

const aggParameters = fields => {
  const aggs = {}
  Object.keys(fields).forEach(field => {
    aggs[field] = { terms: { field } }
  })
  return aggs
}

export const querySourceByEntity = ({ source, entity, page = 0, q = '', filters = {} }) => {
  const { labels } = entity;
  const aggs = aggParameters(DATASPACE_SOURCES[source].aggs)
  const query = queryString(labels)

  if (isNull(labels)) {
    return {}
  }
  let body = null;
  if (source === "scr_ebrains1") {
    body = {
      size: 0,
      query: {
        query_string: { query }
      },
      // aggs: {
      //   sources: {
      //     terms: {
      //       field: '_index',
      //       size: 20
      //     }
      //   }
      // }
    }
  } else {
    body = {
      aggs,
      query: {
        bool: {
          must: { query_string: { query } }
        }
      }
    }
    const filterFields = omitBy(filters, isEmpty)
    if (!isEmpty(filterFields)) {
      body.query.bool.filter = filterBuilder(filterFields)
    }
  }

  // Now set pagination
  body.size = 25
  body.from = page * 25




  // const request = esclient.search({
  //   index: source,
  //   type: 'dataSpace',
  //   body
  // }).then(response => ({
  //   results: response.hits,
  //   facets: response.aggregations,
  //   page, q, filters
  // }))

  return axios.get(API_END_POINT + 'entity/source-data-by-entity', { params: { body, source } }).then(res => {
    console.debug("response return from server source-data-by-entity'");
    console.debug(res.data);
    const response = res.data;
    return {
      results: response.hits,
      facets: response.aggregations,
      page, q, filters
    }
  });
  // return request
}
