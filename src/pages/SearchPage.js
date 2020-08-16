import React, { useEffect } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import EntitySearch from "features/entitySearch/EntitySearch";
import querystring from "querystring";
import DataSpaceFreeTextSearch from "../features/dataSpace/DataSpaceFreeTextSearch";
import FreeTextParent from "../features/freeTextSearch/freeTextParentSearch";
import LiteratureSearch from "../features/literature/LiteratureSearch";
import { searchStyles } from "./HomePage";
import { withStyles } from "@material-ui/core";
function TabPanel(props) {
  const { children, ...other } = props;

  return (
    <div role="tabpanel" {...other}>
      {children}
    </div>
  );
}

function SearchPage(props) {
  const query = querystring.parse(props.location.search.replace("?", ""));
  const { q } = query;
  const [value, setValue] = React.useState(0);
  const [searchText, setSearchText] = React.useState(q);

  useEffect(() => {
    const oldValue = value;
    setValue(-1);
    setValue(oldValue);
  }, [searchText]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = (event, searchText) => {
    event.preventDefault();
    setSearchText(searchText);
  };
  const history = { pathname: "/search", search: `q=${q}` };
  return (
    <div>
      <div className={props.classes.searchContainer}>
        <FreeTextParent
          classes={props.classes}
          handleSubmit={handleSubmit}
          history={history}
          searchText={q}
        />
      </div>
      <Tabs
        value={value}
        slug={searchText}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        className="free-text-tabs-parent"
      >
        <Tab label="Datasources" />
        <Tab label="Publications" />
        <Tab label="Terms" />
      </Tabs>
      <div index={value}>
        {value === 0 && (
          <TabPanel>
            <DataSpaceFreeTextSearch slug={searchText} dataSpace={{}} />;
          </TabPanel>
        )}
        {value === 1 && (
          <TabPanel>
            <LiteratureSearch slug={searchText} />
          </TabPanel>
        )}
        {value === 2 && (
          <TabPanel>
            <EntitySearch q={searchText} history={props.history} />
          </TabPanel>
        )}
      </div>
    </div>
  );
}

export default withStyles(searchStyles)(SearchPage);
