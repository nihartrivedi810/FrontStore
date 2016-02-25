function localStorageGet(name)
{
	if(localStorage[name])
	{
		return JSON.parse(localStorage[name]);
	}
	else
	{
		return null;
	}
};
function localStorageSet(name,value)
{
	localStorage[name]=JSON.stringify(value);
};

function getAllParameters(url){
	if(url===undefined){
		return;
	}
	var urlArraySplit1 = url.split("?");
	var urlArraySplit2 =urlArraySplit1[1].split("&");
	var parameters = {};
	var paramVal;
	urlArraySplit2.forEach(function(parameter){
		paramVal = parameter.split("=");
		parameters[paramVal[0]] = decodeURIComponent(paramVal[1]);
	});
	return parameters;
}