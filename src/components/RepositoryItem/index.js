// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {itemDetails} = props
  const {imageUrl, name, starsCount, forksCount, issuesCount} = itemDetails

  return (
    <li className="list-container">
      <img src={imageUrl} alt={name} className="list-image" />
      <h1 className="list-headings">{name}</h1>
      <div className="container2">
        <img
          className="icons"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="icons-text">{starsCount} stars</p>
      </div>
      <div className="container2">
        <img
          className="icons"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="icons-text">{forksCount} forks</p>
      </div>
      <div className="container2">
        <img
          className="icons"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="icons-text">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
