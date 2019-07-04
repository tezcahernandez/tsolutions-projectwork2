rscript = async (accesstoken, accesstokenidp) => {
    const workOrders = await d3.json("/raroute/workorders");
    const operations = await d3.json("/raroute/operations");
    
}