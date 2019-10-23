function isActive(location,page) {
    const hash = location.hash.slice(2),
        hashArr = hash.split('/');
    return hashArr === page;
}
export default {
    goods(location) {
        return isActive(location,'goods')
    },
    customer() {
        return isActive(location,'customer')
    },
    main() {
        return true;
    }
}
