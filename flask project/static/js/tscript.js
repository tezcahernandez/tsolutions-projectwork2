
const tscript = async (accesstoken, accesstokenidp) => {
    const workOrders = await d3.json("/teroute/workorders");
    const operations = await d3.json("/teroute/operations");
    
}