onmessage = (e) => {
    const msg = e.data;
    switch (msg.type) {
        case 'cy-json': {
            createCyJSON(msg.json);
            return;
        }
    }
}

function createCyJSON(json) {
    let res = [];
    let cnt = 0;

    for (const ip of json["ips"]) {
        let ipId = ip["id"] ? ip["id"] : ip["address"];

        let ipJSON = {};
        ipJSON["data"] = {};
        ipJSON["data"]["id"] = ipId;
        ipJSON["data"]["class"] = "ip";
        ipJSON["group"] = "nodes";
        res.push(ipJSON);

        for (const client of ip["clients"]) {
            let clientJSON = {};
            clientJSON["data"] = {};
            clientJSON["data"]["id"] = client["name"];
            clientJSON["data"]["latency"] = client["latency"];
            clientJSON["data"]["class"] = "client";
            clientJSON["data"]["parent"] = ipId;
            clientJSON["group"] = "nodes";
            res.push(clientJSON);

            for (const pubEdge of client["published"]) {
                let pubEdgeJSON = {};
                pubEdgeJSON["data"] = {};
                pubEdgeJSON["data"]["id"] = "edge_"+(cnt++);
                pubEdgeJSON["data"]["bps"] = pubEdge["bps"];
                pubEdgeJSON["data"]["source"] = client["name"];
                pubEdgeJSON["data"]["target"] = pubEdge["topic"];
                pubEdgeJSON["group"] = "edges";
                res.push(pubEdgeJSON);
            }
        }
    }

    for (const topic of json["topics"]) {
        let topicJSON = {};
        topicJSON["data"] = {};
        topicJSON["data"]["id"] = topic["name"];
        topicJSON["data"]["class"] = "topic";
        topicJSON["group"] = "nodes";
        res.push(topicJSON);

        for (const subEdge of topic["subscriptions"]) {
            let subEdgeJSON = {};
            subEdgeJSON["data"] = {};
            subEdgeJSON["data"]["id"] = "edge_"+(cnt++);
            subEdgeJSON["data"]["bps"] = subEdge["bps"];
            subEdgeJSON["data"]["source"] = topic["name"];
            subEdgeJSON["data"]["target"] = subEdge["client"];
            subEdgeJSON["group"] = "edges";
            res.push(subEdgeJSON);
        }
    }

    postMessage({type: "result", json: res});
}
