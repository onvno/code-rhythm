const addCommit = ( snippet ) => {
    const keys = Object.keys(snippet);
    keys.map(key => {
        const name = key.slice(1);
        snippet[key]['body'].unshift(`/* start ${name} */`);
        snippet[key]['body'].push(`/* end ${name} */`);
    })    
}

module.exports = addCommit