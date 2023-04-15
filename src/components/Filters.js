import { Collapse, Select, Button, Checkbox } from 'antd';
import styled from 'styled-components';


const ResetButton = styled(Button)`
  background-color: #7c7c7c;
  color: white;
  border-color: none;
  float:right;
`;

const { Panel } = Collapse;

const Filters = ({ onFilterChange, data, filters, resetFilters }) => {

  return (
    <div className="filters">
      <Collapse>
        <Panel header="Show Filters">
          {data.filters.map((filter) => {
            if (filter.type === "multiselect") {
              return (
                <Select
                  key={`${filter.code}-${filter.options.map((option) => (option.value))}`}
                  placeholder={`Select ${filter.name}`}
                  value={filters[filter.code] || []}
                  onChange={(value) => onFilterChange(filter.code, value)}
                  style={{ width: '20%' }}
                  options={filter.options.map((option) => ({
                    value: option.value,
                    label: option.name,
                  }))}
                />
              )
            }
            else if (filter.type === "checkbox") {
              return (
                <Checkbox
                  key={filter.code}
                  onChange={(e) => onFilterChange(filter.code, filter.options[0].value)}
                  checked={filters[filter.code]}
                >
                  {filter.name}
                </Checkbox>
              );
            }
            return null;
          })}
          <ResetButton onClick={resetFilters}>Reset Filters</ResetButton>

        </Panel>
      </Collapse>

    </div >
  );
};

export default Filters;
