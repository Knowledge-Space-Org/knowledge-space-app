import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import EntitySearch from "features/entitySearch/EntitySearch";
import querystring from "querystring";
import DataSpaceFreeTextSearch from "../features/dataSpace/DataSpaceFreeTextSearch";
function TabPanel(props) {
  const { children, ...other } = props;

  return (
    <div role="tabpanel" {...other}>
      {children}
    </div>
  );
}

export default function SearchPage(props) {
  const query = querystring.parse(props.location.search.replace("?", ""));
  const { q } = query;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="Datasources" />
        <Tab label="Publications" />
        <Tab label="Terms" />
      </Tabs>
      <div index={value}>
        {value === 0 && (
          <TabPanel>
            <DataSpaceFreeTextSearch slug={q} dataSpace={{}} />;
          </TabPanel>
        )}
        {value === 1 && <TabPanel>Item Two</TabPanel>}
        {value === 2 && (
          <TabPanel>
            <EntitySearch q={q} history={props.history} />
          </TabPanel>
        )}
      </div>
    </div>
  );
}
