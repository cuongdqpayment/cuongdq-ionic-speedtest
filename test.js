var ip= '::ffff:10.63.225.86';
//ip.replace(/::ffff:/, '');
ip = ip.replace(/f+/, '').replace(/:+/, '')
console.log(ip);