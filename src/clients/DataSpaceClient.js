import {
  toString,
  head,
  isNull,
  omitBy,
  isEmpty,
  isArray,
  has,
  keys,
  map,
  flatten,
} from "lodash";
import { DATASPACE_SOURCES } from "features/dataSpace/dataSpaceConstants";
import { API_END_POINT } from "./ESClient";
import { filterBuilder } from "./utils";
import axios from "axios";
const queryString = (labels) => {
  if (labels.length > 1) {
    return labels.map((label) => `(${label})`).join(" OR ");
  } else {
    return head(labels);
  }
};

export const queryAllByEntity = ({ labels }) => {
  if (isNull(labels)) {
    return {};
  }

  return axios
    .get(API_END_POINT + "entity/all-data-by-entity", { params: { labels } })
    .then((res) => {
      const response = res.data;
      console.debug("check all data");
      console.debug(response);
      return response.aggregations.sources.buckets;
    });
};

const aggParameters = (fields) => {
  const aggs = {};
  Object.keys(fields).forEach((field) => {
    aggs[field] = { terms: { field } };
  });
  return aggs;
};

export const querySourceByEntity = ({
  source,
  entity,
  page = 0,
  q = "",
  filters = {},
}) => {
  const { labels } = entity;
  const aggs = aggParameters(DATASPACE_SOURCES[source].aggs);
  const query = queryString(labels);

  if (isNull(labels)) {
    return {};
  }
  const body = {
    aggs,
    query: {
      bool: {
        must: { query_string: { query } },
      },
    },
  };
  const filterFields = omitBy(filters, isEmpty);
  if (!isEmpty(filterFields)) {
    body.query.bool.filter = filterBuilder(filterFields);
  }

  // Now set pagination
  body.size = 25;
  body.from = page * 25;

  return axios
    .get(API_END_POINT + "entity/source-data-by-entity", {
      params: { body, source },
    })
    .then((res) => {
      const response = res.data;
      return {
        results: response.hits,
        facets: response.aggregations,
        page,
        q,
        filters,
      };
    });
  // return request
};

export const queryDataSourceByFreeText = ({
  freeText,
  page = 0,
  q = "",
  filters = {},
}) => {
  console.debug("calling api res");
  console.debug(freeText);
  const labels = [freeText];
  // const aggs = aggParameters(DATASPACE_SOURCES[source].aggs);
  console.debug("freeText");
  const query = queryString(labels);

  if (isNull(labels)) {
    console.debug("returnng");
    return {};
  }
  console.debug("check body");
  const body = {
    // aggs,
    query: {
      bool: {
        must: { query_string: { query } },
      },
    },
  };
  const filterFields = omitBy(filters, isEmpty);
  if (!isEmpty(filterFields)) {
    body.query.bool.filter = filterBuilder(filterFields);
  }

  // Now set pagination
  body.size = 25;
  body.from = page * 25;
  console.debug("going to call rest api");
  return axios
    .get(API_END_POINT + "entity/all-data-by-free-text", {
      params: { body },
    })
    .then((res) => {
      console.debug("check free text data response");
      console.debug(res);
      const response = res.data;
      return {
        results: response.hits,
        facets: response.aggregations,
        page,
        q,
        filters,
      };
    });
  // return request
};
