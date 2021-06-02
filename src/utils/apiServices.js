import {CONFIG} from './constants';
/**
 * Util class to make APIServices
 */
class APIServices {
    /**
   * Method to fetch list of github repos from server
   * @param   {string} [searchValue]  Value to be used to query the repositories
   * @param   {string} [page]  The current page number. Used in pagination for infinite scroll
   * @param   {string} [repoCount]  Count of repos to be fetched per API request
   * @returns {Promise}
   */
    async getRepoList (searchValue, page =1, repoCount = CONFIG.numberPerPage) {
        let url = CONFIG.url+`?per_page=${repoCount}`;
        if(searchValue!==undefined) {
            url += `&q=${searchValue}&page=${page}`
        }
        const response = await fetch(
            url
        );
        if (response.status === 200) {
            return await response.json();
        } else {
            throw Error('Invalid (or) unexpected response code from server');
        }
    }
}

export default new APIServices();
