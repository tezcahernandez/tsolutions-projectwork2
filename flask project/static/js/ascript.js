ascript = async (accesstoken, accesstokenidp) => {
    const workOrders = await d3.json("/alroute/workorders");
    const operations = await d3.json("/alroute/operations");
}