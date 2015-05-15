var http = require('http');
var crypto = require('crypto');
var method = "POST";
var URI = "http://fuck.boy";
var body = "{'dicks': 'buttes'}";
var api_secret = '011b0b0427991ae7d2ded47dab956a83';
var date = '20150515';
//$HTTP_REQUEST_METHOD + '\n' +
//$CANONICAL_URI + '\n' +
//SHA256_HEX_DIGEST($REQUEST_BODY);

var shasum = crypto.createHash('sha256');
shasum.update(body);
shasum = shasum.digest('hex');
var canonical = method + '\n' + URI + '\n' + shasum;
var canonicalRequestDigest = crypto.createHash('sha256').update(canonical).digest('hex');
console.log(canonical);
console.log(canonicalRequestDigest);
var keyDate = crypto.createHash('sha256').update('tokenwtf' + api_secret, date).digest('hex');
var signingKey = crypto.createHash('sha256').update(keyDate, "tokenwtf_request").digest('hex');
console.log('-----------------------');
console.log(keyDate, signingKey);

//request_signature_hmac = HMAC_SHA256(signing_key, canonical_request_digest)
//request_signature = HEX_ENCODE(request_signature_hmac)
var requestSignature = crypto.createHash('sha256').update(signingKey, canonicalRequestDigest).digest('hex');
http.request({}, function(res){
	if(res.body){
		console.log(res.body);
		return;
	}
	console.log(res);
});