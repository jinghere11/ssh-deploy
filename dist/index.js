#!/usr/bin/env node
(()=>{var e={898:(e,s,r)=>{"use strict";var o=r(81).spawn;var t=r(837);var escapeSpaces=function(e){if(typeof e==="string"){return e.replace(/\b\s/g,"\\ ")}else{return e}};var escapeSpacesInOptions=function(e){["src","dest","include","exclude","excludeFirst"].forEach((function(s){var r=e[s];if(typeof r==="string"){e[s]=escapeSpaces(r)}else if(Array.isArray(r)===true){e[s]=r.map(escapeSpaces)}}));return e};e.exports=function(e,s){e=e||{};e=t._extend({},e);e=escapeSpacesInOptions(e);var r=e.platform||process.platform;var n=r==="win32";if(typeof e.src==="undefined"){throw new Error("'src' directory is missing from options")}if(typeof e.dest==="undefined"){throw new Error("'dest' directory is missing from options")}var c=e.dest;if(typeof e.host!=="undefined"){c=e.host+":"+e.dest}if(!Array.isArray(e.src)){e.src=[e.src]}var i=[].concat(e.src);i.push(c);var a=(e.args||[]).find((function(e){return e.match(/--chmod=/)}));if(n&&!a){i.push("--chmod=ugo=rwX")}if(typeof e.host!=="undefined"||e.ssh){i.push("--rsh");var d="ssh";if(typeof e.port!=="undefined"){d+=" -p "+e.port}if(typeof e.privateKey!=="undefined"){d+=" -i "+e.privateKey}if(typeof e.sshCmdArgs!=="undefined"){d+=" "+e.sshCmdArgs.join(" ")}i.push(d)}if(e.recursive===true){i.push("--recursive")}if(e.times===true){i.push("--times")}if(e.syncDest===true||e.deleteAll===true){i.push("--delete");i.push("--delete-excluded")}if(e.syncDestIgnoreExcl===true||e.delete===true){i.push("--delete")}if(e.dryRun===true){i.push("--dry-run");i.push("--verbose")}if(typeof e.excludeFirst!=="undefined"&&t.isArray(e.excludeFirst)){e.excludeFirst.forEach((function(e,s){i.push("--exclude="+e)}))}if(typeof e.include!=="undefined"&&t.isArray(e.include)){e.include.forEach((function(e,s){i.push("--include="+e)}))}if(typeof e.exclude!=="undefined"&&t.isArray(e.exclude)){e.exclude.forEach((function(e,s){i.push("--exclude="+e)}))}switch(e.compareMode){case"sizeOnly":i.push("--size-only");break;case"checksum":i.push("--checksum");break}if(typeof e.args!=="undefined"&&t.isArray(e.args)){i=[...new Set([...i,...e.args])]}i=[...new Set(i)];var noop=function(){};var l=e.onStdout||noop;var u=e.onStderr||noop;var p="rsync ";i.forEach((function(e){if(e.substr(0,4)==="ssh "){e='"'+e+'"'}p+=e+" "}));p=p.trim();if(e.noExec){s(null,null,null,p);return}try{var f="";var h="";var y;if(n){y=o("cmd.exe",["/s","/c",'"'+p+'"'],{windowsVerbatimArguments:true,stdio:[process.stdin,"pipe","pipe"]})}else{y=o("/bin/sh",["-c",p])}y.stdout.on("data",(function(e){l(e);f+=e}));y.stderr.on("data",(function(e){u(e);h+=e}));y.on("exit",(function(e){var r=null;if(e!==0){r=new Error("rsync exited with code "+e);r.code=e}s(r,f,h,p)}))}catch(e){s(e,null,null,p)}}},505:(e,s,r)=>{const{existsSync:o,mkdirSync:t,writeFileSync:n}=r(147);const{join:c}=r(17);const validateDir=e=>{if(!e){console.warn("⚠️ [DIR] dir is not defined");return}if(o(e)){console.log(`✅ [DIR] ${e} dir exist`);return}console.log(`[DIR] Creating ${e} dir in workspace root`);t(e);console.log("✅ [DIR] dir created.")};const handleError=(e,s)=>{if(s){throw new Error(e)}console.warn(e)};const writeToFile=({dir:e,filename:s,content:r,isRequired:t,mode:i="0644"})=>{validateDir(e);const a=c(e,s);if(o(a)){const e=`⚠️ [FILE] ${a} Required file exist.`;handleError(e,t);return}try{console.log(`[FILE] writing ${a} file ...`,r.length);n(a,r,{encoding:"utf8",mode:i})}catch(e){const s=`⚠️[FILE] Writing to file error. filePath: ${a}, message:  ${e.message}`;handleError(s,t)}};const validateRequiredInputs=e=>{const s=Object.keys(e);const r=s.filter((s=>{const r=e[s];if(!r){console.error(`❌ [INPUTS] ${s} is mandatory`)}return r}));if(r.length!==s.length){throw new Error("⚠️ [INPUTS] Inputs not valid, aborting ...")}};const snakeToCamel=e=>e.replace(/[^a-zA-Z0-9]+(.)/g,((e,s)=>s.toUpperCase()));e.exports={writeToFile:writeToFile,validateRequiredInputs:validateRequiredInputs,snakeToCamel:snakeToCamel}},229:(e,s,r)=>{const{snakeToCamel:o}=r(505);const t=["REMOTE_HOST","REMOTE_USER","REMOTE_PORT","SSH_PRIVATE_KEY","DEPLOY_KEY_NAME","SOURCE","TARGET","ARGS","SSH_CMD_ARGS","EXCLUDE","SCRIPT_BEFORE","SCRIPT_AFTER","SCRIPT_BEFORE_REQUIRED","SCRIPT_AFTER_REQUIRED"];const n=process.env.GITHUB_WORKSPACE;const c=process.env.REMOTE_USER||process.env.INPUT_REMOTE_USER;const i={source:"",target:`/home/${c}/`,exclude:"",args:"-rlgoDzvc -i",sshCmdArgs:"-o StrictHostKeyChecking=no",deployKeyName:`deploy_key_${c}_${Date.now()}`};const a={githubWorkspace:n};t.forEach((e=>{const s=o(e.toLowerCase());const r=process.env[e]||process.env[`INPUT_${e}`]||i[s];const t=r===undefined?i[s]:r;let c=t;switch(s){case"source":c=t.split(" ").map((e=>`${n}/${e}`));break;case"args":c=t.split(" ");break;case"exclude":case"sshCmdArgs":c=t.split(",").map((e=>e.trim()));break}a[s]=c}));a.sshServer=`${a.remoteUser}@${a.remoteHost}`;a.rsyncServer=`${a.target}`;e.exports=a},976:(e,s,r)=>{const{exec:o}=r(81);const t=r(113);const{sshServer:n,githubWorkspace:c,remotePort:i}=r(229);const{writeToFile:a}=r(505);const handleError=(e,s,r)=>{if(s){r(new Error(e))}else{console.warn(e)}};const remoteCmd=async(e,s,r,d)=>new Promise(((l,u)=>{const p=t.randomUUID();const f=`local_ssh_script-${d}-${p}.sh`;try{a({dir:c,filename:f,content:e});const t=1e4;const d=(process.env.RSYNC_STDOUT||"").substring(0,t);console.log(`Executing remote script: ssh -i ${s} ${n}`);o(`DEBIAN_FRONTEND=noninteractive ssh -i ${s} -o StrictHostKeyChecking=no ${n} 'RSYNC_STDOUT="${d}" bash -s' < ${f}`,((e,s="",o="")=>{if(e){const t=`⚠️ [CMD] Remote script failed: ${e.message}`;console.warn(`${t} \n`,s,o);handleError(t,r,u)}else{const e=s.substring(0,t);console.log("✅ [CMD] Remote script executed. \n",e,o);l(e)}}))}catch(e){handleError(e.message,r,u)}}));e.exports={remoteCmdBefore:async(e,s,r)=>remoteCmd(e,s,r,"before"),remoteCmdAfter:async(e,s,r)=>remoteCmd(e,s,r,"after")}},447:(e,s,r)=>{const{execSync:o}=r(81);const t=r(898);const nodeRsyncPromise=async e=>new Promise(((s,r)=>{const logCMD=e=>{console.warn("================================================================");console.log(e);console.warn("================================================================")};try{t(e,((e,o,t,n)=>{if(e){console.error("❌ [Rsync] error: ");console.error(e);console.error("❌ [Rsync] stderr: ");console.error(t);console.error("❌️ [Rsync] stdout: ");console.error(o);console.error("❌ [Rsync] command: ");logCMD(n);r(new Error(`${e.message}\n\n${t}`))}else{console.log("⭐ [Rsync] command finished: ");logCMD(n);s(o)}}))}catch(e){console.error("❌ [Rsync] command error: ",e.message,e.stack);r(e)}}));const validateRsync=async()=>{try{o("rsync --version",{stdio:"inherit"});console.log("✅️ [CLI] Rsync exists");return}catch(e){console.warn("⚠️ [CLI] Rsync doesn't exists",e.message)}console.log('[CLI] Start rsync installation with "apt-get" \n');try{o("sudo DEBIAN_FRONTEND=noninteractive apt-get -y update && sudo DEBIAN_FRONTEND=noninteractive apt-get --no-install-recommends -y install rsync",{stdio:"inherit"});console.log("✅ [CLI] Rsync installed. \n")}catch(e){throw new Error(`⚠️ [CLI] Rsync installation failed. Aborting ... error: ${e.message}`)}};const rsyncCli=async({source:e,rsyncServer:s,exclude:r,remotePort:o,privateKeyPath:t,args:n,sshCmdArgs:c})=>{console.log(`[Rsync] Starting Rsync Action: ${e} to ${s}`);if(r&&r.length>0)console.log(`[Rsync] excluding folders ${r}`);const i={ssh:true,recursive:true,onStdout:e=>console.log(e.toString()),onStderr:e=>console.error(e.toString())};return nodeRsyncPromise({...i,src:e,dest:s,excludeFirst:r,port:o,privateKey:t,args:n,sshCmdArgs:c})};const sshDeploy=async e=>{await validateRsync();const s=await rsyncCli(e);console.log("✅ [Rsync] finished.",s);process.env.RSYNC_STDOUT=`${s}`;return s};e.exports={sshDeploy:sshDeploy}},822:(e,s,r)=>{const{join:o}=r(17);const{execSync:t}=r(81);const{EOL:n}=r(37);const{writeToFile:c}=r(505);const i="known_hosts";const getPrivateKeyPath=(e="")=>{const{HOME:s}=process.env;const r=o(s||"~",".ssh");const t=o(r,i);return{dir:r,filename:e,path:o(r,e),knownHostsPath:t}};const addSshKey=(e,s)=>{const{dir:r,filename:o}=getPrivateKeyPath(s);c({dir:r,filename:i,content:""});console.log("✅ [SSH] known_hosts file ensured",r);c({dir:r,filename:o,content:`${e}${n}`,isRequired:true,mode:"0400"});console.log("✅ [SSH] key added to `.ssh` dir ",r,o)};const updateKnownHosts=(e,s)=>{const{knownHostsPath:r}=getPrivateKeyPath();console.log("[SSH] Adding host to `known_hosts` ....",e,r);try{t(`ssh-keyscan -p ${s||22} -H ${e}  >> ${r}`,{stdio:"inherit"})}catch(s){console.error("❌ [SSH] Adding host to `known_hosts` ERROR",e,s.message)}console.log("✅ [SSH] Adding host to `known_hosts` DONE",e,r)};e.exports={getPrivateKeyPath:getPrivateKeyPath,updateKnownHosts:updateKnownHosts,addSshKey:addSshKey}},81:e=>{"use strict";e.exports=require("child_process")},113:e=>{"use strict";e.exports=require("crypto")},147:e=>{"use strict";e.exports=require("fs")},37:e=>{"use strict";e.exports=require("os")},17:e=>{"use strict";e.exports=require("path")},837:e=>{"use strict";e.exports=require("util")}};var s={};function __nccwpck_require__(r){var o=s[r];if(o!==undefined){return o.exports}var t=s[r]={exports:{}};var n=true;try{e[r](t,t.exports,__nccwpck_require__);n=false}finally{if(n)delete s[r]}return t.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var r={};(()=>{const{sshDeploy:e}=__nccwpck_require__(447);const{remoteCmdBefore:s,remoteCmdAfter:r}=__nccwpck_require__(976);const{addSshKey:o,getPrivateKeyPath:t,updateKnownHosts:n}=__nccwpck_require__(822);const{validateRequiredInputs:c}=__nccwpck_require__(505);const i=__nccwpck_require__(229);const run=async()=>{const{source:a,remoteUser:d,remoteHost:l,remotePort:u,deployKeyName:p,sshPrivateKey:f,args:h,exclude:y,sshCmdArgs:m,scriptBefore:g,scriptBeforeRequired:_,scriptAfter:R,scriptAfterRequired:E,rsyncServer:w}=i;c({sshPrivateKey:f,remoteHost:l,remoteUser:d});o(f,p);const{path:v}=t(p);if(g||R){n(l,u)}if(g){await s(g,v,_)}await e({source:a,rsyncServer:w,exclude:y,remotePort:u,privateKeyPath:v,args:h,sshCmdArgs:m});if(R){await r(R,v,E)}};run().then(((e="")=>{console.log("✅ [DONE]",e)})).catch((e=>{console.error("❌ [ERROR]",e.message);process.exit(1)}))})();module.exports=r})();
