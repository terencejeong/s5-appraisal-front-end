export const getAppraisals = async() => {
  try {
    let res = await fetch('https://agile-badlands-24100.herokuapp.com/appraisals')
    return res.json()
  } catch(e) {
    console.log(e)
  }
};

export const postAppraisal = async(appraisal) => {
  try {
    let headers = new Headers()
    headers.append("Content-Type", "application/json");
    let submit = await fetch(
      'https://agile-badlands-24100.herokuapp.com/new-appraisal', {
        method: 'POST',
        body: JSON.stringify(appraisal),
        headers,
      });
    const appraisalAwait = await submit.json()
  } catch (e) {
    console.log(e)
  }
}

export const deleteAppraisal = async() => {
  try {
    let headers = new Headers()
    headers.append("Content-Type", "application/json");

    let removeAppraisal = await fetch (
      'https://agile-badlands-24100.herokuapp.com/delete-all', {
        method: 'DELETE',
        headers,
      });
    return removeAppraisal.json()
  } catch(e) {

  }
}
