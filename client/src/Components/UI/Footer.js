import React from 'react';


export const Footer = (props) => {

    return (
        <div id='Footer' className='Footer' class="fixed-bottom">
            <footer class="page-footer font-small bg-light">
                <div class="footer-copyright text-center py-3 terms">
                    © 2020 Copyright:&nbsp;
                    <a 
                        href="https://github.com/PavelItel228/testingReact" 
                        target='_blank' 
                        rel="noopener noreferrer"
                    > 
                        Testing
                    </a>
                </div>
            </footer>
        </div>
    );
}