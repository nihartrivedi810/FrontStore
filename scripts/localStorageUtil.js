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
