import styles from './icon.module.scss';
import {useLocation} from "react-router-dom";

let logoIcon;

export const Logo = ({ width = '158', height = '40' }) => {
    const location = useLocation();

    if (location.pathname === '/trends') {
        logoIcon = `${styles.logo} ${styles.logoTrends}`;
    } else {
        logoIcon = styles.logo;
    }

    return (
        <div className={styles.wrapLogo}>
            <svg width={width} height={height} className={logoIcon} viewBox="0 0 158 40" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5.51105 9.67813L6.01623 12.8746C6.96536 11.7795 8.26658 10.8768 9.91989 10.1665C11.6038 9.45616 13.3031 9.101 15.0176 9.101C20.2225 9.101 22.8249 13.0078 22.8249 20.8213C22.8249 25.024 22.1207 27.9689 20.7124 29.6559C19.3346 31.3134 17.1608 32.1421 14.191 32.1421C11.1293 32.1421 8.60336 31.4317 6.61326 30.0111C6.76635 31.5205 6.81227 33.0892 6.75104 34.717V40H0V9.67813H5.51105ZM6.75104 16.3374V26.3707C9.13916 26.9626 10.8537 27.2586 11.8947 27.2586C13.3949 27.2586 14.4206 26.8442 14.9717 26.0155C15.5534 25.1868 15.8443 23.4554 15.8443 20.8213C15.8443 18.2464 15.584 16.515 15.0635 15.6271C14.5431 14.7096 13.6245 14.2508 12.308 14.2508C10.8078 14.2508 8.95546 14.9464 6.75104 16.3374Z"
                    fill="#7B61FF"
                />
                <path
                    d="M30.5907 0H33.6218C34.9383 0 35.5966 0.63633 35.5966 1.90899V4.30632C35.5966 5.57898 34.9383 6.21531 33.6218 6.21531H30.5907C29.2742 6.21531 28.6159 5.57898 28.6159 4.30632V1.90899C28.6159 0.63633 29.2742 0 30.5907 0ZM35.5047 31.5649H28.7537V9.67813H35.5047V31.5649Z"
                    fill="#7B61FF"
                />
                <path
                    d="M52.5823 22.3751H52.3067L46.9334 31.5649H39.9528L46.9334 20.333L40.4579 9.67813H47.3927L52.2148 18.1132H52.6741L57.4963 9.67813H64.431L57.9555 20.333L64.9362 31.5649H57.9555L52.5823 22.3751Z"
                    fill="#7B61FF"
                />
                <path
                    d="M83.671 22.8191H75.4962C75.7106 24.4173 76.2004 25.4976 76.9659 26.0599C77.7619 26.5927 79.0631 26.859 80.8695 26.859C83.2883 26.859 86.105 26.6963 89.3198 26.3707L89.9628 30.455C87.6053 31.5501 84.3139 32.0977 80.0888 32.0977C75.833 32.0977 72.802 31.2098 70.9956 29.434C69.1892 27.6582 68.286 24.7281 68.286 20.6437C68.286 16.3522 69.1585 13.3481 70.9037 11.6315C72.6795 9.91491 75.6493 9.0566 79.8132 9.0566C83.5791 9.0566 86.304 9.69293 87.988 10.9656C89.6719 12.2087 90.5292 14.1176 90.5598 16.6926C90.5598 18.7347 90.0087 20.2738 88.9065 21.3097C87.8349 22.3159 86.0897 22.8191 83.671 22.8191ZM75.3585 18.8679H81.788C82.6147 18.8679 83.1658 18.6755 83.4413 18.2908C83.7475 17.906 83.9006 17.3437 83.9006 16.6038C83.9006 15.5679 83.625 14.8576 83.0739 14.4728C82.5228 14.0585 81.5125 13.8513 80.0429 13.8513C78.2977 13.8513 77.1036 14.1916 76.4607 14.8724C75.8177 15.5235 75.4503 16.8553 75.3585 18.8679Z"
                    fill="white"
                />
                <path
                    d="M101.401 9.67813L101.86 12.8746C104.738 10.3293 107.616 9.0566 110.494 9.0566C113.556 9.0566 115.5 10.2405 116.327 12.6082C118.99 10.2405 121.746 9.0566 124.593 9.0566C126.644 9.0566 128.206 9.57455 129.278 10.6104C130.349 11.6463 130.885 13.1558 130.885 15.1387V31.5649H124.134V17.1809C124.134 16.2338 123.965 15.5679 123.629 15.1831C123.292 14.7984 122.664 14.606 121.746 14.606C121.011 14.606 120.307 14.7392 119.633 15.0055C118.96 15.2719 117.98 15.7899 116.694 16.5594V31.5649H110.173V17.1809C110.173 16.2338 109.974 15.5679 109.575 15.1831C109.208 14.7984 108.596 14.606 107.738 14.606C106.544 14.606 104.876 15.2423 102.733 16.515V31.5649H95.9816V9.67813H101.401Z"
                    fill="white"
                />
                <path
                    d="M137.931 14.5616L137.288 10.1221C141.36 9.41176 145.294 9.0566 149.09 9.0566C152.152 9.0566 154.402 9.66333 155.841 10.8768C157.28 12.0607 158 14.1324 158 17.0921V31.5649H152.627L151.938 28.2353C149.672 30.8102 146.886 32.0977 143.579 32.0977C141.406 32.0977 139.63 31.5501 138.252 30.455C136.874 29.3304 136.185 27.7765 136.185 25.7936V23.5738C136.185 21.8276 136.798 20.4661 138.022 19.4895C139.247 18.5128 140.946 18.0244 143.12 18.0244H151.203V17.0477C151.172 15.923 150.897 15.1683 150.376 14.7836C149.886 14.3988 148.922 14.2064 147.483 14.2064C144.972 14.2064 141.788 14.3248 137.931 14.5616ZM142.891 24.0621V24.9057C142.891 26.4151 143.778 27.1698 145.554 27.1698C147.391 27.1698 149.274 26.4595 151.203 25.0388V21.9756H145.095C143.625 22.0052 142.891 22.7007 142.891 24.0621Z"
                    fill="white"
                />
            </svg>
        </div>
    );
}



export const Home = () => (
    <svg width="24" height="24" className={styles.menuIcon} viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M14.4537 3.8032L19.4558 7.49793C20.4198 8.1956 20.9934 9.31112 21 10.5011V17.1895C20.938 19.3342 19.1566 21.0268 17.0116 20.979H6.99789C4.8492 21.032 3.06195 19.338 3 17.1895V10.5011C3.00659 9.31112 3.58019 8.1956 4.54421 7.49793L9.54632 3.8032C11.0068 2.73227 12.9932 2.73227 14.4537 3.8032ZM7.73684 16.9716H16.2632C16.6556 16.9716 16.9737 16.6535 16.9737 16.2611C16.9737 15.8687 16.6556 15.5506 16.2632 15.5506H7.73684C7.34443 15.5506 7.02632 15.8687 7.02632 16.2611C7.02632 16.6535 7.34443 16.9716 7.73684 16.9716Z"
              fill="#80858B"/>
    </svg>
);

export const Trends = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12.0513 2L10.6813 4.8C9.70235 6.80035 8.39031 8.61962 6.8013 10.18L6.6213 10.35C5.60076 11.3408 5.01766 12.6977 5.0013 14.12V14.3C4.97427 17.0851 6.63391 19.6101 9.2013 20.69L9.4613 20.8C11.1452 21.5152 13.0474 21.5152 14.7313 20.8H14.7913C17.3779 19.6762 19.0375 17.1099 19.0013 14.29V9.95C18.1393 11.9185 16.5739 13.4946 14.6113 14.37C14.6113 14.37 14.6113 14.37 14.5513 14.37C14.4913 14.37 13.7913 14.66 13.4913 14.37C13.2234 14.0989 13.1977 13.6712 13.4313 13.37L13.5013 13.32H13.5513C15.8471 11.575 16.3823 8.34172 14.7713 5.95C13.4713 3.97 12.0513 2 12.0513 2Z"
                fill="#80858B"/>
        </svg>

    );
};

export const Favorites = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16.77 20.7843L12.48 17.4943C12.0722 17.1843 11.5078 17.1843 11.1 17.4943L6.77 20.7843C6.45424 21.0381 6.02377 21.0959 5.65228 20.9343C5.28078 20.7727 5.02957 20.4184 5 20.0143V5.95431C5.03878 5.12998 5.40465 4.35513 6.01656 3.80141C6.62847 3.24769 7.4359 2.96081 8.26 3.00431H15.26C16.0891 2.96643 16.8987 3.26256 17.5077 3.82643C18.1166 4.39029 18.4741 5.17479 18.5 6.00431V20.0143C18.4611 20.4038 18.2163 20.7426 17.8586 20.9017C17.501 21.0609 17.0855 21.0161 16.77 20.7843Z"
                fill="#80858B"/>
        </svg>
    );
};

export const Settings = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M19.2264 8.73077C19.4169 9.19491 19.8683 9.49854 20.37 9.5C21.0509 9.50549 21.6 10.0591 21.6 10.74V12.88C21.6 13.5648 21.0448 14.12 20.36 14.12C19.8583 14.1215 19.4069 14.4251 19.2164 14.8892C19.026 15.3534 19.134 15.8865 19.49 16.24C19.9676 16.7295 19.9676 17.5106 19.49 18L17.99 19.5C17.5005 19.9776 16.7195 19.9776 16.23 19.5C16.0042 19.2608 15.6889 19.1267 15.36 19.13C15.0294 19.1273 14.7114 19.2568 14.4767 19.4896C14.242 19.7225 14.11 20.0394 14.11 20.37C14.11 21.0548 13.5548 21.61 12.87 21.61H10.73C10.0452 21.61 9.49 21.0548 9.49 20.37C9.49001 20.0394 9.358 19.7225 9.12328 19.4896C8.88857 19.2568 8.5706 19.1273 8.24 19.13C7.91111 19.1267 7.59576 19.2608 7.37 19.5C6.88055 19.9776 6.09945 19.9776 5.61 19.5L4.11 18C3.63237 17.5106 3.63237 16.7295 4.11 16.24C4.46605 15.8865 4.57402 15.3534 4.38355 14.8892C4.19308 14.4251 3.7417 14.1215 3.24 14.12C2.91113 14.12 2.59573 13.9894 2.36319 13.7568C2.13064 13.5243 2 13.2089 2 12.88V10.74C2 10.0552 2.55517 9.5 3.24 9.5C3.7417 9.49854 4.19308 9.19491 4.38355 8.73077C4.57402 8.26664 4.46605 7.73346 4.11 7.38C3.63237 6.89055 3.63237 6.10945 4.11 5.62L5.61 4.12C6.09945 3.64237 6.88055 3.64237 7.37 4.12C7.59576 4.35919 7.91111 4.49331 8.24 4.49C8.57234 4.49269 8.89185 4.36186 9.12685 4.12685C9.36186 3.89185 9.49269 3.57234 9.49 3.24C9.49 2.55517 10.0452 2 10.73 2H12.88C13.5648 2 14.12 2.55517 14.12 3.24C14.1173 3.57234 14.2481 3.89185 14.4831 4.12685C14.7182 4.36186 15.0377 4.49269 15.37 4.49C15.6989 4.49331 16.0142 4.35919 16.24 4.12C16.7295 3.64237 17.5105 3.64237 18 4.12L19.5 5.62C19.9776 6.10945 19.9776 6.89055 19.5 7.38C19.144 7.73346 19.036 8.26664 19.2264 8.73077ZM8.34 11.81C8.34 9.8991 9.8891 8.35 11.8 8.35C12.7177 8.35 13.5977 8.71454 14.2466 9.36341C14.8955 10.0123 15.26 10.8924 15.26 11.81C15.26 13.7209 13.7109 15.27 11.8 15.27C9.8891 15.27 8.34 13.7209 8.34 11.81Z"
                  fill="#80858B"/>
        </svg>
    );
};

export const SortIcon = () => {
    return (
        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M0 1C0 0.447715 0.447715 0 1 0H15C15.5523 0 16 0.447715 16 1C16 1.55228 15.5523 2 15 2H1C0.447715 2 0 1.55228 0 1ZM5 7C5 6.44772 5.44772 6 6 6H15C15.5523 6 16 6.44772 16 7C16 7.55228 15.5523 8 15 8H6C5.44772 8 5 7.55228 5 7ZM9 13C9 12.4477 9.44771 12 10 12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H10C9.44771 14 9 13.5523 9 13Z"
                  fill="#AFB2B6"/>
        </svg>
    );
}

export const SpinnerIcon = () => {
    return (
        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.95334 2C4.77424 3.14066 2.5 6.1842 2.5 9.75958C2.5 14.3106 6.18483 18 10.7303 18V18C14.322 18 17.3764 15.6965 18.5 12.4844"
                stroke="#7B61FF" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
    );
}

export const Hamburger = ( {className} ) => {
    return (
        <svg className={className} width="19.2" height="16.8" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M0 1C0 0.447715 0.447715 0 1 0H15C15.5523 0 16 0.447715 16 1C16 1.55228 15.5523 2 15 2H1C0.447715 2 0 1.55228 0 1ZM0 7C0 6.44772 0.447715 6 1 6H15C15.5523 6 16 6.44772 16 7C16 7.55228 15.5523 8 15 8H1C0.447715 8 0 7.55228 0 7ZM0 13C0 12.4477 0.447715 12 1 12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H1C0.447715 14 0 13.5523 0 13Z"
                  fill="white"/>
        </svg>
    );
}

export const FireIcon = ( {className} ) => {
    return (
        <svg className={ className } width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5.03562 0L4.05711 2.17207C3.35791 3.72381 2.4208 5.13509 1.28586 6.34554L1.1573 6.47741C0.428392 7.24599 0.0119184 8.29864 0.000232328 9.40195V9.54158C-0.0190735 11.7021 1.1663 13.6609 3.00004 14.4985L3.18574 14.5839C4.38842 15.1387 5.7471 15.1387 6.94978 14.5839H6.99264C8.84008 13.7121 10.0254 11.7214 9.99959 9.53382V6.16712C9.38393 7.69418 8.26585 8.91683 6.86407 9.59588C6.86407 9.59588 6.86407 9.59588 6.82122 9.59588C6.77837 9.59588 6.2784 9.82084 6.06413 9.59588C5.87275 9.38556 5.85442 9.0538 6.02127 8.82014L6.07127 8.78135H6.10698C7.74671 7.42768 8.12898 4.91952 6.97835 3.06417C6.04984 1.5282 5.03562 0 5.03562 0Z"
                fill="white"/>
        </svg>
    )
}

/*
export const Home = ({ width = '18', height = '18', fill = '#7B61FF' }) => (
    <svg width={width} height={height} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.4537 0.803197L16.4558 4.49793C17.4198 5.1956 17.9934 6.31112 18 7.50109V14.1895C17.938 16.3342 16.1566 18.0268 14.0116 17.979H3.99789C1.8492 18.032 0.0619475 16.338 0 14.1895V7.50109C0.00659331 6.31112 0.580187 5.1956 1.54421 4.49793L6.54632 0.803197C8.00682 -0.267732 9.99318 -0.267732 11.4537 0.803197ZM4.73684 13.9716H13.2632C13.6556 13.9716 13.9737 13.6535 13.9737 13.2611C13.9737 12.8687 13.6556 12.5506 13.2632 12.5506H4.73684C4.34443 12.5506 4.02632 12.8687 4.02632 13.2611C4.02632 13.6535 4.34443 13.9716 4.73684 13.9716Z"
            fill={fill}
        />
    </svg>
);*/
