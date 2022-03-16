

export const Footer = () => {

    // HTML to be returned to GiffyGram component
    return `
        <footer class="footer">
            <div class="footer__item">
                &copy; ${new Date().getFullYear()}
                &nbsp; made by Rushay, For Learning purposes only &nbsp;
                Posts since <select id="yearSelection">
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                </select>
                <span id="postCount"> &nbsp; 0</span>
            </div>
        </footer>
    `
}