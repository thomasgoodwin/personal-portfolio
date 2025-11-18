
export const setCookie = (
    name: string,
    value: string,
    days = 7,
    path = "/"
) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
        value
    )};expires=${expires.toUTCString()};path=${path}`;
}

export const getCookie = (name: string): string | null => {
    const match = document.cookie.match(
        new RegExp(`(^| )${encodeURIComponent(name)}=([^;]+)`)
    );
    return match ? decodeURIComponent(match[2]) : null;
}

export const deleteCookie = (name: string, path = "/") => {
    document.cookie = `${encodeURIComponent(name)}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path}`;
}
