const filterSearch = ({router, pageSize, keyword, sortBy, ordering, pageNum}: any) => {
    const path = router.pathname;
    const query = router.query;

    if(pageSize) query.pageSize = pageSize;
    if(keyword) query.keyword = keyword;
    if(sortBy) query.sortBy = sortBy;
    if(ordering) query.ordering = ordering;
    if(pageNum) query.pageNum = pageNum;

    router.push({
        pathname: path,
        query: query
    })
}

export default filterSearch