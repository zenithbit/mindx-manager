import React, { HTMLAttributes } from 'react';

const Progressing = (props: HTMLAttributes<HTMLElement | any>) => {
    return (
        <svg className={props.className} {...props} width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.49992 0.333496C3.81992 0.333496 0.833252 3.32016 0.833252 7.00016C0.833252 10.6802 3.81992 13.6668 7.49992 13.6668C11.1799 13.6668 14.1666 10.6802 14.1666 7.00016C14.1666 3.32016 11.1799 0.333496 7.49992 0.333496ZM3.89992 6.48683C4.01325 5.6935 4.36659 4.98016 4.91992 4.42016C6.25325 3.0935 8.35325 3.02016 9.77992 4.18016V3.54683C9.77992 3.2735 10.0066 3.04683 10.2799 3.04683C10.5533 3.04683 10.7799 3.2735 10.7799 3.54683V5.32683C10.7799 5.60016 10.5533 5.82683 10.2799 5.82683H8.49992C8.22659 5.82683 7.99992 5.60016 7.99992 5.32683C7.99992 5.0535 8.22659 4.82683 8.49992 4.82683H8.99992C7.96659 4.10683 6.53992 4.20683 5.61992 5.12683C5.21992 5.52683 4.96659 6.04683 4.87992 6.62683C4.84659 6.8735 4.63325 7.0535 4.38659 7.0535C4.35992 7.0535 4.33992 7.0535 4.31325 7.04683C4.05325 7.0135 3.85992 6.76016 3.89992 6.48683ZM10.0799 9.58016C9.36659 10.2935 8.43325 10.6468 7.49992 10.6468C6.68659 10.6468 5.87992 10.3602 5.21325 9.82016V10.4468C5.21325 10.7202 4.98659 10.9468 4.71325 10.9468C4.43992 10.9468 4.21325 10.7202 4.21325 10.4468V8.66683C4.21325 8.3935 4.43992 8.16683 4.71325 8.16683H6.49325C6.76659 8.16683 6.99325 8.3935 6.99325 8.66683C6.99325 8.94016 6.76659 9.16683 6.49325 9.16683H5.99325C7.02659 9.88683 8.45325 9.78683 9.37325 8.86683C9.77325 8.46683 10.0266 7.94683 10.1133 7.36683C10.1533 7.0935 10.3999 6.90016 10.6799 6.94016C10.9533 6.98016 11.1399 7.2335 11.1066 7.50683C10.9866 8.3135 10.6333 9.02683 10.0799 9.58016Z" fill="#2064F0" />
        </svg>
    )
}

export default Progressing;