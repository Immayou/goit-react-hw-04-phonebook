import PropTypes from 'prop-types'; 
import shortid from "shortid";
import { FilterWrapper, FilterLabel, InputFilterField } from './Filter.styled'

const Filter = ({value, filterInput}) => {

    const filterInputId = shortid.generate()

        return (
            <FilterWrapper>
              <FilterLabel htmlFor={filterInputId}>Find contacts by name</FilterLabel>
              <InputFilterField
            id={filterInputId}
            onChange={filterInput}
            type="text"
            value={value}
            name="filter"
            title="Filter by name"
          />
            </FilterWrapper>
        );
}

export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  filterInput: PropTypes.func.isRequired
}


// class Filter extends Component {

//   static propTypes = {
//     value: PropTypes.string.isRequired,
//     filterInput: PropTypes.func.isRequired
//   }

//   filterInputId = shortid.generate()

//   render () {
//       return (
//           <FilterWrapper>
//             <FilterLabel htmlFor={this.filterInputId}>Find contacts by name</FilterLabel>
//             <InputFilterField
//           id={this.filterInputId}
//           onChange={this.props.filterInput}
//           type="text"
//           value={this.props.value}
//           name="filter"
//           title="Filter by name"
//         />
//           </FilterWrapper>
//       );
// };}

