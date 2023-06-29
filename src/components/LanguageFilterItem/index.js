// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {items, isActiveBtn, renderRelatedData} = props
  const {id, language} = items
  const btnClassName = isActiveBtn ? 'active-btn' : 'btn'

  const onFilterItems = () => {
    renderRelatedData(id)
  }
  return (
    <li>
      <button type="button" className={btnClassName} onClick={onFilterItems}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
