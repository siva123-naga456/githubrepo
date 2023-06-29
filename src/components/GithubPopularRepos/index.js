import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    isActive: languageFiltersData[0].id,
    apiStatus: apiStatusList.initial,
    list: [],
  }

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    const {isActive} = this.state
    this.setState({apiStatus: apiStatusList.inprogress})

    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${isActive}`
    const options = {
      method: 'GET',
    }
    const request = await fetch(githubReposApiUrl, options)
    const data = await request.json()
    console.log(data)
    if (request.ok) {
      const updateData = data.popular_repos.map(each => ({
        id: each.id,
        imageUrl: each.avatar_url,
        name: each.name,
        starsCount: each.stars_count,
        forksCount: each.forks_count,
        issuesCount: each.issues_count,
      }))
      this.setState({list: updateData, apiStatus: apiStatusList.success})
    } else {
      this.setState({apiStatus: apiStatusList.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-text">Something Went Wrong</h1>
    </div>
  )

  renderRepositoryItemView = () => {
    const {list} = this.state
    return (
      <ul className="unOrder-list1">
        {list.map(each => (
          <RepositoryItem itemDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusList.success:
        return this.renderRepositoryItemView()
      case apiStatusList.failure:
        return this.renderFailureView()
      case apiStatusList.inprogress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderRelatedData = id => {
    this.setState({isActive: id}, this.getData)
  }

  render() {
    const {isActive} = this.state
    return (
      <div className="main-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="unOrder-list">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              items={each}
              key={each.id}
              isActiveBtn={isActive === each.id}
              renderRelatedData={this.renderRelatedData}
            />
          ))}
        </ul>
        {this.renderRepositories()}
      </div>
    )
  }
}
export default GithubPopularRepos
