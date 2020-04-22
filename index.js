const core = require('@actions/core');

async function init() {
    const gitShortSha = process.env.GITHUB_SHA.substr(0,8);
    const gitRef = (process.env.GITHUB_REF || "").replace('refs/heads/', '').replace('refs/tags/', '');
    console.log(`Git ref [${gitRef}]`);
    
    const name = core.getInput('name');
    console.log(`Received name [${name}]`);
    const prefix = core.getInput('prefix');
    console.log(`Received prefix [${prefix}]`);
    const suffix = core.getInput('suffix');
    console.log(`Received prefix [${suffix}]`);
    
    let envId = slugify(name ? name : gitRef);
    
    if(envId.length > 10){
        envId = envId.substr(0, 10);
    }
    
    if(prefix) {
        envId = prefix + '-' + envId;
    }

    if(suffix) {
        envId = envId + '-' + suffix;
    }
    
    core.setOutput("id", envId);
}

function slugify(string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}


init().catch(err => {
    core.setFailed(`Action failed with error ${err}`);
});
