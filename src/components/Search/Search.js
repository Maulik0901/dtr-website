import React, { useState } from "react";
import "./search.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { communityData } from "../../communityData";
import { educationData } from "../../EducationData";
import { countryList } from "../myprofile/Country";
import { indianState } from "../myprofile/states";

function Search() {
  const history = useNavigate();
  const [id, setId] = useState("");
  const [age, setAge] = useState("");
  const [ageTo, setAgeTo] = useState("");
  const [height, setHeight] = useState("");
  const [motherTongue, setMotherTongue] = useState("Any");
  const [maritalStatus, setMaritalStatus] = useState("Any");
  const [subCast, setSubCast] = useState("Any");
  const [cast, setCast] = useState("Any");
  // const [country, setcountry] = useState("Any");
  const [education, seteducation] = useState("Any");
  const [ageAd, setAgeAd] = useState("");
  const [agetoAd, setAgetoAd] = useState("");
  const userInfo = localStorage.getItem("dtrmatrimonyjwt");
  const [heightAd, setHeightAd] = useState("Any");
  const [HeightAdFrom, setHeightAdFrom] = useState("Any");
  const [heightAdTo, setHeightAdTo] = useState("Any");
  const [motherTongueAd, setMotherTongueAd] = useState("Any");
  const [maritalStatusAd, setMaritalStatusAd] = useState("Any");
  const [communityAd, setCommunityAd] = useState("Any");
  const [SubCommunityAd, setSubCommunityAd] = useState("Any");
  const [educationAd, setEducationad] = useState("Any");
  // const [occupation, setOccupation] = useState("Any");
  const [CountryAd, setCountryAd] = useState("Any");
  const [StateAd, setStateAd] = useState("Any");
  const [CityAd, setCityAd] = useState("Any");
  const [familyDetail, setFamilyDetail] = useState({
    lowerMiddle: "",
    middleClass: "",
    upperMiddle: "",
    rich: "",
    affluent: "",
  });
  const [dataLoading, setDataLoading] = useState(false);
  const [showProfile, setShowPofile] = useState();
  const [donShow, setDontShow] = useState({
    ignored: "",
    ViewedProfiles: "",
    ShortlistedProfiles: "",
  });
  function handleChangeFamily(evt) {
    const value = evt.target.value;
    setFamilyDetail({
      ...familyDetail,
      [evt.target.name]: value,
    });
  }
  function handleChangeDontShow(evt) {
    const value = evt.target.value;
    setDontShow({
      ...donShow,
      [evt.target.name]: value,
    });
  }
  const handleSearchByID = () => {
    setDataLoading(true)
    axios
      .get(process.env.REACT_APP_API_URL+`life/filter?id=${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${userInfo}`,
        },
      })
      .then((res) => {
        setDataLoading(false)
        history("/ViewProfile", { state: { data: [res.data], admin: false } });
      })
      .catch((err) => {
        setDataLoading(false)
        console.log(err);
      });
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setDataLoading(true)
    axios
      .get(
        process.env.REACT_APP_API_URL+`life/basic-search?age=${age}&ageTo=${ageTo}&height=${height}&motherTongue=${motherTongue}&maritalStatus=${maritalStatus}&community=${cast}&subCommunity=${subCast}&education=${education}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${userInfo}`,
          },
        }
      )
      .then((res) => {
        setDataLoading(false)
        history("/ViewProfile", { state: { data: res.data, admin: false } });
      })
      .catch((err) => {
        setDataLoading(false)
        console.log(err);
      });
  };
  const handleAdvanceSearchSubmit = (e) => {
    e.preventDefault();
    setDataLoading(true)
    axios
      .get(
        process.env.REACT_APP_API_URL+`life/advance-search?age=${ageAd}&ageTo=${agetoAd}&height=${heightAdTo}&motherTongue=${motherTongueAd}&maritalStatus=${maritalStatusAd}&community=${communityAd}&subCommunity=${SubCommunityAd}&education=${educationAd}&country=${CountryAd}&state=${StateAd}&city=${CityAd}&familyStatus=${familyDetail}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${userInfo}`,
          },
        }
      )
      .then((res) => {
        setDataLoading(false)
        history("/ViewProfile", { state: { data: res.data, admin: false } });
      })
      .catch((err) => {
        setDataLoading(false)
        console.log(err);
      });
  };
  return (
    <div className="searches">
      <div className="col-sm-12 px-0 mb-5">
        <div className="col-sm-4 px-0" style={{ margin: "0px auto" }}>
          <div className="search-sidebar">
            <div className="search-by-id">
              <form className="" onSubmit={(e) => e.preventDefault()}>
                <label className="font-weight-bold form-label">
                  Search by DTR ID
                </label>
                <div className="form-group row">
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      value={id}
                      onChange={(e) => {
                        setId(e.target.value);
                      }}
                    />
                  </div>
                  {dataLoading && (
                    <div
                      style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        zIndex: 999,
                        width: "50px",
                        height: "50px",
                        background: "rgba(0,0,0,0.6)",
                      }}
                      class="spinner-border"
                      role="status"
                    ></div>
                  )}
                  <div class="pl-0 mt-1 text-center col-sm-2">
                    <button
                      onClick={() => {
                        handleSearchByID();
                      }}
                      type="button"
                      class="mx-1 bnr-btn btn btn-primary btn-sm"
                    >
                      Search
                    </button>
                  </div>
                  <div class="errorMsg px-3 mt-2"> </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Tabs defaultActiveKey="first">
        <Tab eventKey="first" title="Basic Search">
          <form>
            <div className="form-group row" style={{ display: "flex" }}>
              <div className="col-sm-3">
                <label class="form-label">Age</label>
              </div>
              <div className="col-sm-2">
                <select
                  required
                  className="form-control"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                >
                  <option>Select</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                  <option value="32">32</option>
                  <option value="33">33</option>
                  <option value="34">34</option>
                  <option value="35">35</option>
                  <option value="36">36</option>
                  <option value="37">37</option>
                  <option value="38">38</option>
                  <option value="39">39</option>
                  <option value="40">40</option>
                  <option value="41">41</option>
                  <option value="42">42</option>
                  <option value="43">43</option>
                  <option value="44">44</option>
                  <option value="45">45</option>
                  <option value="46">46</option>
                  <option value="47">47</option>
                  <option value="48">48</option>
                  <option value="49">49</option>
                  <option value="50">50</option>
                  <option value="51">51</option>
                  <option value="52">52</option>
                  <option value="53">53</option>
                  <option value="54">54</option>
                  <option value="55">55</option>
                  <option value="56">56</option>
                  <option value="57">57</option>
                  <option value="58">58</option>
                  <option value="59">59</option>
                  <option value="60">60</option>
                  <option value="61">61</option>
                  <option value="62">62</option>
                  <option value="63">63</option>
                  <option value="64">64</option>
                  <option value="65">65</option>
                  <option value="66">66</option>
                  <option value="67">67</option>
                  <option value="68">68</option>
                  <option value="69">69</option>
                  <option value="70">70</option>
                </select>
              </div>
              <p className="mt-1 mb-0 ml-3">To</p>
              <div className="col-sm-2">
                <select
                  required
                  className="form-control"
                  value={ageTo}
                  onChange={(e) => setAgeTo(e.target.value)}
                >
                  <option>Select</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                  <option value="32">32</option>
                  <option value="33">33</option>
                  <option value="34">34</option>
                  <option value="35">35</option>
                  <option value="36">36</option>
                  <option value="37">37</option>
                  <option value="38">38</option>
                  <option value="39">39</option>
                  <option value="40">40</option>
                  <option value="41">41</option>
                  <option value="42">42</option>
                  <option value="43">43</option>
                  <option value="44">44</option>
                  <option value="45">45</option>
                  <option value="46">46</option>
                  <option value="47">47</option>
                  <option value="48">48</option>
                  <option value="49">49</option>
                  <option value="50">50</option>
                  <option value="51">51</option>
                  <option value="52">52</option>
                  <option value="53">53</option>
                  <option value="54">54</option>
                  <option value="55">55</option>
                  <option value="56">56</option>
                  <option value="57">57</option>
                  <option value="58">58</option>
                  <option value="59">59</option>
                  <option value="60">60</option>
                  <option value="61">61</option>
                  <option value="62">62</option>
                  <option value="63">63</option>
                  <option value="64">64</option>
                  <option value="65">65</option>
                  <option value="66">66</option>
                  <option value="67">67</option>
                  <option value="68">68</option>
                  <option value="69">69</option>
                  <option value="70">70</option>
                </select>
              </div>
              <div className="col-sm-3">
                <label className="quicksearch-lbl form-label">Years</label>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-3">
                <label className="form-label">Height</label>
              </div>
              <div className="col-sm-2">
                <select
                  required
                  className="form-control"
                  value={heightAd}
                  onChange={(e) => setHeightAd(e.target.value)}
                >
                  <option>Select</option>
                  <option value="4.0">4ft</option>
                  <option value="4.1">4ft 1in</option>
                  <option value="4.2">4ft 2in</option>
                  <option value="4.3">4ft 3in</option>
                  <option value="4.4">4ft 4in</option>
                  <option value="4.5">4ft 5in</option>
                  <option value="4.6">4ft 6in</option>
                  <option value="4.7">4ft 7in</option>
                  <option value="4.8">4ft 8in</option>
                  <option value="4.9">4ft 9in</option>
                  <option value="4.10">4ft 10in</option>
                  <option value="4.11">4ft 11in</option>
                  <option value="5.0">5ft</option>
                  <option value="5.1">5ft 1in</option>
                  <option value="5.2">5ft 2in</option>
                  <option value="5.3">5ft 3in</option>
                  <option value="5.4">5ft 4in</option>
                  <option value="5.5">5ft 5in</option>
                  <option value="5.6">5ft 6in</option>
                  <option value="5.7">5ft 7in</option>
                  <option value="5.8">5ft 8in</option>
                  <option value="5.9">5ft 9in</option>
                  <option value="5.10">5ft 10in</option>
                  <option value="5.11">5ft 11in</option>
                  <option value="6.0">6ft</option>
                  <option value="6.1">6ft 1in</option>
                  <option value="6.2">6ft 2in</option>
                  <option value="6.3">6ft 3in</option>
                  <option value="6.4">6ft 4in</option>
                  <option value="6.5">6ft 5in</option>
                  <option value="6.6">6ft 6in</option>
                  <option value="6.7">6ft 7in</option>
                  <option value="6.8">6ft 8in</option>
                  <option value="6.9">6ft 9in</option>
                  <option value="6.10">6ft 10in</option>
                  <option value="6.11">6ft 11in</option>
                  <option value="7.0">7ft</option>
                  <option value="7.1">7ft 1in</option>
                  <option value="7.2">7ft 2in</option>
                </select>
              </div>
              <p className="mt-1 mb-0 ml-3">To</p>
              <div className="col-sm-2">
                <select
                  required
                  className="form-control"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                >
                  <option>Select</option>
                  <option value="4.0">4ft</option>
                  <option value="4.1">4ft 1in</option>
                  <option value="4.2">4ft 2in</option>
                  <option value="4.3">4ft 3in</option>
                  <option value="4.4">4ft 4in</option>
                  <option value="4.5">4ft 5in</option>
                  <option value="4.6">4ft 6in</option>
                  <option value="4.7">4ft 7in</option>
                  <option value="4.8">4ft 8in</option>
                  <option value="4.9">4ft 9in</option>
                  <option value="4.10">4ft 10in</option>
                  <option value="4.11">4ft 11in</option>
                  <option value="5.0">5ft</option>
                  <option value="5.1">5ft 1in</option>
                  <option value="5.2">5ft 2in</option>
                  <option value="5.3">5ft 3in</option>
                  <option value="5.4">5ft 4in</option>
                  <option value="5.5">5ft 5in</option>
                  <option value="5.6">5ft 6in</option>
                  <option value="5.7">5ft 7in</option>
                  <option value="5.8">5ft 8in</option>
                  <option value="5.9">5ft 9in</option>
                  <option value="5.10">5ft 10in</option>
                  <option value="5.11">5ft 11in</option>
                  <option value="6.0">6ft</option>
                  <option value="6.1">6ft 1in</option>
                  <option value="6.2">6ft 2in</option>
                  <option value="6.3">6ft 3in</option>
                  <option value="6.4">6ft 4in</option>
                  <option value="6.5">6ft 5in</option>
                  <option value="6.6">6ft 6in</option>
                  <option value="6.7">6ft 7in</option>
                  <option value="6.8">6ft 8in</option>
                  <option value="6.9">6ft 9in</option>
                  <option value="6.10">6ft 10in</option>
                  <option value="6.11">6ft 11in</option>
                  <option value="7.0">7ft</option>
                  <option value="7.1">7ft 1in</option>
                  <option value="7.2">7ft 2in</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-3">
                <label className="form-label" for="motherTongue">
                  Mother Tongue
                </label>
              </div>
              <div className="col-sm-9">
                <select
                  required
                  className="form-control"
                  value={motherTongue}
                  onChange={(e) => setMotherTongue(e.target.value)}
                >
                  <option value="Any">Any</option>
                  {[
                    "Assamese",
                    "Bengali",
                    "Gujarati",
                    "Hindi",
                    "Kannada",
                    "Kashmiri",
                    "Konkani",
                    "Malayalam",
                    "Manipuri",
                    "Marathi",
                    "Nepali",
                    "Oriya",
                    "Punjabi",
                    "Sanskrit",
                    "Sindhi",
                    "Tamil",
                    "Telugu",
                    "Urdu",
                    "Bodo",
                    "Santhali",
                    "Maithili",
                    "Dogri",
                  ].map((e) => (
                    <option value={e}>{e}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-3">
                <label className="form-label">Marital Status</label>
              </div>
              <div className="col-sm-9">
                <select
                  required
                  className="form-control"
                  onChange={(e) => setMaritalStatus(e.target.value)}
                  value={maritalStatus}
                >
                  <option value="Any">Any</option>
                  <option value={"Never Married"}>Never Married</option>
                  <option value={"Seperated"}>Seperated</option>

                  <option value={"Divorced"}>Divorced</option>
                  <option value={"Widow/Widower"}>Widow/Widower</option>
                  <option value={"Awaiting Divorce"}>Awaiting Divorce</option>
                  <option value={"Annulled"}>Annulled</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-3">
                <label className="form-label" for="caste">
                  Community
                </label>
              </div>
              <div className="col-sm-9">
                <select
                  required
                  className="form-control"
                  value={cast}
                  onChange={(e) => setCast(e.target.value)}
                >
                  <option value="Any">Any</option>
                  {communityData.communities.map((data) => (
                    <option value={data.community}>{data.community}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-3">
                <label className="form-label" for="sub caste">
                  Sub Community
                </label>
              </div>
              <div className="col-sm-9">
                <select
                  required
                  className="form-control"
                  value={subCast}
                  onChange={(e) => setSubCast(e.target.value)}
                >
                  <option value="Any">Any</option>
                  {communityData.communities
                    .filter((e) => e.community === cast)[0]
                    .subCommunity.map((data) => (
                      <option value={data}>{data}</option>
                    ))}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-3">
                <label className="form-label" for="education">
                  Education
                </label>
              </div>
              <div className="col-sm-9">
                <select
                  required
                  className="form-control"
                  value={education}
                  onChange={(e) => seteducation(e.target.value)}
                >
                  <option value="Any">Any</option>
                  {educationData.HighestEducation.map((e) => (
                    <option value={e.title}>{e.title}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* <div className="form-group row">
                            <div className="col-sm-3">
                                <label className="form-label" for="country" value={country} onChange={(e) => setcountry(e.target.value)}>
                                    Country
                                </label>
                            </div>
                            <div className="col-sm-9">
                                <select required className="form-control">
                                    <option value="India">India</option>
                                    <option>Tamil</option>
                                    <option>Kannada</option>
                                </select>
                            </div>
                        </div> */}
            <div class="text-center w-100">
              <button
                type="button"
                class="btn btn-primary"
                onClick={(e) => handleSearchSubmit(e)}
              >
                Search
              </button>
            </div>
          </form>
        </Tab>
        <Tab eventKey="second" title="Advanced Search">
          <form onSubmit={handleAdvanceSearchSubmit}>
            <div className="form-group row">
              <div className="col-sm-3">
                <label class="form-label">Age</label>
              </div>
              <div className="col-sm-2">
                <select
                  required
                  className="form-control"
                  value={ageAd}
                  onChange={(e) => {
                    setAgeAd(e.target.value);
                  }}
                >
                  <option>Select</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                  <option value="32">32</option>
                  <option value="33">33</option>
                  <option value="34">34</option>
                  <option value="35">35</option>
                  <option value="36">36</option>
                  <option value="37">37</option>
                  <option value="38">38</option>
                  <option value="39">39</option>
                  <option value="40">40</option>
                  <option value="41">41</option>
                  <option value="42">42</option>
                  <option value="43">43</option>
                  <option value="44">44</option>
                  <option value="45">45</option>
                  <option value="46">46</option>
                  <option value="47">47</option>
                  <option value="48">48</option>
                  <option value="49">49</option>
                  <option value="50">50</option>
                  <option value="51">51</option>
                  <option value="52">52</option>
                  <option value="53">53</option>
                  <option value="54">54</option>
                  <option value="55">55</option>
                  <option value="56">56</option>
                  <option value="57">57</option>
                  <option value="58">58</option>
                  <option value="59">59</option>
                  <option value="60">60</option>
                  <option value="61">61</option>
                  <option value="62">62</option>
                  <option value="63">63</option>
                  <option value="64">64</option>
                  <option value="65">65</option>
                  <option value="66">66</option>
                  <option value="67">67</option>
                  <option value="68">68</option>
                  <option value="69">69</option>
                  <option value="70">70</option>
                </select>
              </div>
              <p className="mt-1 mb-0 ml-3">To</p>
              <div className="col-sm-2">
                <select
                  required
                  className="form-control"
                  value={agetoAd}
                  onChange={(e) => {
                    setAgetoAd(e.target.value);
                  }}
                >
                  <option>Select</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                  <option value="32">32</option>
                  <option value="33">33</option>
                  <option value="34">34</option>
                  <option value="35">35</option>
                  <option value="36">36</option>
                  <option value="37">37</option>
                  <option value="38">38</option>
                  <option value="39">39</option>
                  <option value="40">40</option>
                  <option value="41">41</option>
                  <option value="42">42</option>
                  <option value="43">43</option>
                  <option value="44">44</option>
                  <option value="45">45</option>
                  <option value="46">46</option>
                  <option value="47">47</option>
                  <option value="48">48</option>
                  <option value="49">49</option>
                  <option value="50">50</option>
                  <option value="51">51</option>
                  <option value="52">52</option>
                  <option value="53">53</option>
                  <option value="54">54</option>
                  <option value="55">55</option>
                  <option value="56">56</option>
                  <option value="57">57</option>
                  <option value="58">58</option>
                  <option value="59">59</option>
                  <option value="60">60</option>
                  <option value="61">61</option>
                  <option value="62">62</option>
                  <option value="63">63</option>
                  <option value="64">64</option>
                  <option value="65">65</option>
                  <option value="66">66</option>
                  <option value="67">67</option>
                  <option value="68">68</option>
                  <option value="69">69</option>
                  <option value="70">70</option>
                </select>
              </div>
              <div className="col-sm-3">
                <label className="quicksearch-lbl form-label">Years</label>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-3">
                <label className="form-label">Height</label>
              </div>
              <div className="col-sm-2">
                <select
                  required
                  className="form-control"
                  value={HeightAdFrom}
                  onChange={(e) => setHeightAdFrom(e.target.value)}
                >
                  <option>Select</option>
                  <option value="4.0">4ft</option>
                  <option value="4.1">4ft 1in</option>
                  <option value="4.2">4ft 2in</option>
                  <option value="4.3">4ft 3in</option>
                  <option value="4.4">4ft 4in</option>
                  <option value="4.5">4ft 5in</option>
                  <option value="4.6">4ft 6in</option>
                  <option value="4.7">4ft 7in</option>
                  <option value="4.8">4ft 8in</option>
                  <option value="4.9">4ft 9in</option>
                  <option value="4.10">4ft 10in</option>
                  <option value="4.11">4ft 11in</option>
                  <option value="5.0">5ft</option>
                  <option value="5.1">5ft 1in</option>
                  <option value="5.2">5ft 2in</option>
                  <option value="5.3">5ft 3in</option>
                  <option value="5.4">5ft 4in</option>
                  <option value="5.5">5ft 5in</option>
                  <option value="5.6">5ft 6in</option>
                  <option value="5.7">5ft 7in</option>
                  <option value="5.8">5ft 8in</option>
                  <option value="5.9">5ft 9in</option>
                  <option value="5.10">5ft 10in</option>
                  <option value="5.11">5ft 11in</option>
                  <option value="6.0">6ft</option>
                  <option value="6.1">6ft 1in</option>
                  <option value="6.2">6ft 2in</option>
                  <option value="6.3">6ft 3in</option>
                  <option value="6.4">6ft 4in</option>
                  <option value="6.5">6ft 5in</option>
                  <option value="6.6">6ft 6in</option>
                  <option value="6.7">6ft 7in</option>
                  <option value="6.8">6ft 8in</option>
                  <option value="6.9">6ft 9in</option>
                  <option value="6.10">6ft 10in</option>
                  <option value="6.11">6ft 11in</option>
                  <option value="7.0">7ft</option>
                  <option value="7.1">7ft 1in</option>
                  <option value="7.2">7ft 2in</option>
                </select>
              </div>
              <p className="mt-1 mb-0 ml-3">To</p>
              <div className="col-sm-2">
                <select
                  required
                  className="form-control"
                  value={heightAdTo}
                  onChange={(e) => setHeightAdTo(e.target.value)}
                >
                  <option>Select</option>
                  <option value="4.0">4ft</option>
                  <option value="4.1">4ft 1in</option>
                  <option value="4.2">4ft 2in</option>
                  <option value="4.3">4ft 3in</option>
                  <option value="4.4">4ft 4in</option>
                  <option value="4.5">4ft 5in</option>
                  <option value="4.6">4ft 6in</option>
                  <option value="4.7">4ft 7in</option>
                  <option value="4.8">4ft 8in</option>
                  <option value="4.9">4ft 9in</option>
                  <option value="4.10">4ft 10in</option>
                  <option value="4.11">4ft 11in</option>
                  <option value="5.0">5ft</option>
                  <option value="5.1">5ft 1in</option>
                  <option value="5.2">5ft 2in</option>
                  <option value="5.3">5ft 3in</option>
                  <option value="5.4">5ft 4in</option>
                  <option value="5.5">5ft 5in</option>
                  <option value="5.6">5ft 6in</option>
                  <option value="5.7">5ft 7in</option>
                  <option value="5.8">5ft 8in</option>
                  <option value="5.9">5ft 9in</option>
                  <option value="5.10">5ft 10in</option>
                  <option value="5.11">5ft 11in</option>
                  <option value="6.0">6ft</option>
                  <option value="6.1">6ft 1in</option>
                  <option value="6.2">6ft 2in</option>
                  <option value="6.3">6ft 3in</option>
                  <option value="6.4">6ft 4in</option>
                  <option value="6.5">6ft 5in</option>
                  <option value="6.6">6ft 6in</option>
                  <option value="6.7">6ft 7in</option>
                  <option value="6.8">6ft 8in</option>
                  <option value="6.9">6ft 9in</option>
                  <option value="6.10">6ft 10in</option>
                  <option value="6.11">6ft 11in</option>
                  <option value="7.0">7ft</option>
                  <option value="7.1">7ft 1in</option>
                  <option value="7.2">7ft 2in</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-3">
                <label className="form-label" for="motherTongue">
                  Mother Tongue
                </label>
              </div>
              <div className="col-sm-9">
                <select
                  required
                  className="form-control"
                  value={motherTongueAd}
                  onChange={(e) => setMotherTongueAd(e.target.value)}
                >
                  <option value="any">Any</option>

                  {[
                    "Assamese",
                    "Bengali",
                    "Gujarati",
                    "Hindi",
                    "Kannada",
                    "Kashmiri",
                    "Konkani",
                    "Malayalam",
                    "Manipuri",
                    "Marathi",
                    "Nepali",
                    "Oriya",
                    "Punjabi",
                    "Sanskrit",
                    "Sindhi",
                    "Tamil",
                    "Telugu",
                    "Urdu",
                    "Bodo",
                    "Santhali",
                    "Maithili",
                    "Dogri",
                  ].map((e) => (
                    <option value={e}>{e}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-3">
                <label className="form-label">Marital Status</label>
              </div>
              <div className="col-sm-9">
                <select
                  required
                  className="form-control"
                  onChange={(e) => setMaritalStatusAd(e.target.value)}
                  value={maritalStatusAd}
                >
                  <option value={"Any"}>Any</option>
                  <option value={"Never Married"}>Never Married</option>
                  <option value={"Seperated"}>Seperated</option>

                  <option value={"Divorced"}>Divorced</option>
                  <option value={"Widow/Widower"}>Widow/Widower</option>
                  <option value={"Awaiting Divorce"}>Awaiting Divorce</option>
                  <option value={"Annulled"}>Annulled</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-3">
                <label className="form-label" for="caste">
                  Community
                </label>
              </div>
              <div className="col-sm-9">
                <select
                  required
                  className="form-control"
                  value={communityAd}
                  onChange={(e) => setCommunityAd(e.target.value)}
                >
                  <option value="Any">Any</option>
                  {communityData.communities.map((data) => (
                    <option value={data.community}>{data.community}</option>
                  ))}
                </select>
                {/* <select required className="form-control" >
                                    <option>Any</option>
                                    <option>Tamil</option>
                                    <option>Kannada</option>
                                </select> */}
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-3">
                <label className="form-label" for="sub caste">
                  Sub Community
                </label>
              </div>
              <div className="col-sm-9">
                <select
                  required
                  className="form-control"
                  value={SubCommunityAd}
                  onChange={(e) => setSubCommunityAd(e.target.value)}
                >
                  <option value="Any">Any</option>
                  {communityData.communities
                    .filter((e) => e.community === communityAd)[0]
                    .subCommunity.map((data) => (
                      <option value={data}>{data}</option>
                    ))}
                </select>
              </div>
            </div>
            {/* <div className="form-group row">
                            <div className="col-sm-3">
                                <label className="form-label" for="country">
                                    Country
                                </label>
                            </div>
                            <div className="col-sm-9">
                                <select required className="form-control">
                                    <option>Any</option>
                                    <option>Tamil</option>
                                    <option>Kannada</option>
                                </select>
                            </div>
                        </div> */}
            <h6 class="p-0 font-weight-bold mt-4">Professional Details</h6>
            <hr></hr>
            <div className="form-group row">
              <div className="col-sm-3">
                <label className="form-label" for="education">
                  Education
                </label>
              </div>
              <div className="col-sm-9">
                <select
                  required
                  className="form-control"
                  value={educationAd}
                  onChange={(e) => setEducationad(e.target.value)}
                >
                  <option value="Any">Any</option>
                  {educationData.HighestEducation.map((e) => (
                    <option value={e.title}>{e.title}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* <div className="form-group row">
                            <div className="col-sm-3">
                                <label className="form-label" for="occupation">
                                    Occupation
                                </label>
                            </div>
                            <div className="col-sm-9">
                                <select required className="form-control" value={occupation} onChange={(e) => setOccupation(e.target.value)}>
                                    <option>Any</option>
                                    <option>Tamil</option>
                                    <option>Kannada</option>
                                </select>
                            </div>
                        </div> */}
            <div className="form-group row">
              <div className="col-sm-3">
                <label class="form-label">Annual Income</label>
              </div>
              <div className="col-sm-2">
                <select required className="form-control">
                  <option value="0">Any</option>
                  <option value="50000">50 Thousands</option>
                  <option value="100000">1 Lakh</option>
                  <option value="200000">2 Lakhs</option>
                  <option value="300000">3 Lakhs</option>
                  <option value="400000">4 Lakhs</option>
                  <option value="500000">5 Lakhs</option>
                  <option value="600000">6 Lakhs</option>
                  <option value="700000">7 Lakhs</option>
                  <option value="800000">8 Lakhs</option>
                  <option value="900000">9 Lakhs</option>
                  <option value="1000000">10 Lakhs</option>
                  <option value="1200000">12 Lakhs</option>
                  <option value="1400000">14 Lakhs</option>
                  <option value="1600000">16 Lakhs</option>
                  <option value="1800000">18 Lakhs</option>
                  <option value="2000000">20 Lakhs</option>
                  <option value="2500000">25 Lakhs</option>
                  <option value="3000000">30 Lakhs</option>
                  <option value="3500000">35 Lakhs</option>
                  <option value="4000000">40 Lakhs</option>
                  <option value="4500000">45 Lakhs</option>
                  <option value="5000000">50 Lakhs</option>
                  <option value="6000000">60 Lakhs</option>
                  <option value="7000000">70 Lakhs</option>
                  <option value="8000000">80 Lakhs</option>
                  <option value="9000000">90 Lakhs</option>
                  <option value="10000000">1 Crore</option>
                  <option value="20000000">2 Crores</option>
                  <option value="50000000">5 Crores</option>
                </select>
              </div>
              <p className="mt-1 mb-0 ml-3">To</p>
              <div className="col-sm-2">
                <select required disabled="" class="form-control">
                  <option value="0">Any</option>
                  <option value="50000">50 Thousands</option>
                  <option value="100000">1 Lakh</option>
                  <option value="200000">2 Lakhs</option>
                  <option value="300000">3 Lakhs</option>
                  <option value="400000">4 Lakhs</option>
                  <option value="500000">5 Lakhs</option>
                  <option value="600000">6 Lakhs</option>
                  <option value="700000">7 Lakhs</option>
                  <option value="800000">8 Lakhs</option>
                  <option value="900000">9 Lakhs</option>
                  <option value="1000000">10 Lakhs</option>
                  <option value="1200000">12 Lakhs</option>
                  <option value="1400000">14 Lakhs</option>
                  <option value="1600000">16 Lakhs</option>
                  <option value="1800000">18 Lakhs</option>
                  <option value="2000000">20 Lakhs</option>
                  <option value="2500000">25 Lakhs</option>
                  <option value="3000000">30 Lakhs</option>
                  <option value="3500000">35 Lakhs</option>
                  <option value="4000000">40 Lakhs</option>
                  <option value="4500000">45 Lakhs</option>
                  <option value="5000000">50 Lakhs</option>
                  <option value="6000000">60 Lakhs</option>
                  <option value="7000000">70 Lakhs</option>
                  <option value="8000000">80 Lakhs</option>
                  <option value="9000000">90 Lakhs</option>
                  <option value="10000000">1 Crore</option>
                  <option value="20000000">2 Crores</option>
                  <option value="50000000">5 Crores</option>
                </select>
              </div>
            </div>

            <h6 class="p-0 font-weight-bold mt-4">Location Details</h6>
            <hr></hr>
            <div className="form-group row">
              <div className="col-sm-3">
                <label className="form-label" for="country">
                  Country
                </label>
              </div>
              <div className="col-sm-9">
                <select
                  required
                  className="form-control"
                  value={CountryAd}
                  onChange={(e) => setCountryAd(e.target.value)}
                >
                  <option value="Any">Any</option>
                  {countryList.map((data) => (
                    <option value={data.name}>{data.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-3">
                <label className="form-label" for="state">
                  State
                </label>
              </div>
              <div className="col-sm-9">
                {CountryAd == "India" ? (
                  <select
                    required
                    className="form-control"
                    type="text"
                    value={StateAd}
                    onChange={(e) => setStateAd(e.target.value)}
                  >
                    {" "}
                    <option>select</option>
                    {indianState.states.map((data) => (
                      <option value={data.state}>{data.state}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    required
                    className="form-control"
                    type="text"
                    onChange={(e) => setStateAd(e.target.value)}
                    value={StateAd}
                  ></input>
                )}
                {/* <select required className="form-control">
                                    <option>Tamilnadu</option>
                                    <option>Kerala</option>
                                    <option>Bangalore</option>
                                </select> */}
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-3">
                <label className="form-label" for="district">
                  District/City
                </label>
              </div>
              <div className="col-sm-9">
                {/* <select required className="form-control" value={CityAd} onChange={(e) => setCityAd(e.target.value)}>
                                    <option>Virudhunagar</option>
                                    <option>madurai</option>
                                    <option>Tirunelveli</option>
                                </select> */}
                <input
                  value={CityAd}
                  onChange={(e) => setCityAd(e.target.value)}
                ></input>
              </div>
            </div>
            <h6 className="p-0 font-weight-bold mt-4">Family Details</h6>
            <hr></hr>
            <div className="form-group row">
              <div className="col-sm-3">
                <label class="form-label" for="city">
                  Family Status
                </label>
              </div>
              <div className="col-sm-9">
                <div className="pl-3 mt-2 mb-0 form-group row">
                  <div className="mr-2 font-14 radio-btn-align form-check">
                    <input
                      name="familyStatus"
                      type="checkbox"
                      id="ps-Lower Middle Class"
                      class="form-check-input"
                      value={familyDetail.lowerMiddle}
                      onChange={handleChangeFamily}
                    />
                    <label
                      title=""
                      for="ps-Lower Middle Class"
                      className="form-check-label"
                    >
                      Lower Middle Class
                    </label>
                  </div>
                  <div className="mr-2 font-14 radio-btn-align form-check">
                    <input
                      name="familyStatus"
                      type="checkbox"
                      id="ps-Middle Class"
                      class="form-check-input"
                      value={familyDetail.lowerMiddle}
                      onChange={handleChangeFamily}
                    />
                    <label
                      title=""
                      for="ps-Middle Class"
                      className="form-check-label"
                    >
                      Middle Class
                    </label>
                  </div>
                  <div className="mr-2 font-14 radio-btn-align form-check">
                    <input
                      name="familyStatus"
                      type="checkbox"
                      id="ps-Upper Middle Class"
                      class="form-check-input"
                      value={familyDetail.middleClass}
                      onChange={handleChangeFamily}
                    />
                    <label
                      title=""
                      for="ps-Upper Middle Class"
                      className="form-check-label"
                    >
                      Upper Middle Class
                    </label>
                  </div>
                  <div className="mr-2 font-14 radio-btn-align form-check">
                    <input
                      name="familyStatus"
                      type="checkbox"
                      id="ps-Rich"
                      className="form-check-input"
                      value={familyDetail.rich}
                      onChange={handleChangeFamily}
                    />
                    <label title="" for="ps-Rich" class="form-check-label">
                      Rich
                    </label>
                  </div>
                  {/* <div className="mr-2 font-14 radio-btn-align form-check">
                                        <input
                                            name="familyStatus"
                                            type="checkbox"
                                            id="ps-Affluent"
                                            className="form-check-input"
                                            value={familyDetail.affluent}
                                            onChange={handleChangeFamily}
                                        />
                                        <label title="" for="ps-Affluent" class="form-check-label">
                                            Affluent
                                        </label>
                                    </div> */}
                </div>
              </div>
            </div>
            {/* <div className="form-group row">
                            <div className="col-sm-3">
                                <label class="form-label">Show Profiles</label>
                            </div>
                            <div className="col">
                                <div class="pl-3 mt-2 mb-0 form-group row">
                                    <div className="mr-2 font-14 form-check">
                                        <input
                                            name="showProfile"
                                            type="checkbox"
                                            id="true"
                                            onChange={(e) => setShowPofile(e.target.value)}
                                            value={showProfile}
                                            className="form-check-input"
                                        />
                                        <label title="" for="true" className="form-check-label">
                                            With Photo
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-3">
                                <label class="form-label">Don't show</label>
                            </div>
                            <div className="col">
                                <div class="pl-3 mt-2 mb-0 form-group row">
                                    <div class="mr-2 font-14 form-check">
                                        <input
                                            name="dontShow"
                                            type="checkbox"
                                            id="true"
                                            onChange={handleChangeDontShow}
                                            value={donShow.ignored}
                                            class="form-check-input"
                                        />
                                        <label title="" for="true" class="form-check-label">
                                            Ignored Profiles
                                        </label>
                                    </div>
                                    <div className="mr-2 font-14 form-check">
                                        <input
                                            name="dontShow"
                                            type="checkbox"
                                            id="true"
                                            class="form-check-input"
                                            onChange={handleChangeDontShow}
                                            value={donShow.ViewedProfiles}
                                        />
                                        <label title="" for="true" class="form-check-label">
                                            Viewed Profiles
                                        </label>
                                    </div>
                                    <div className="mr-2 font-14 form-check">
                                        <input
                                            name="dontShow"
                                            type="checkbox"
                                            id="true"
                                            class="form-check-input"
                                            onChange={handleChangeDontShow}
                                            value={donShow.ShortlistedProfiles}
                                        />
                                        <label title="" for="true" className="form-check-label">
                                            Shortlisted Profiles
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div> */}
            <div className="text-center w-100">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAdvanceSearchSubmit}
              >
                Search
              </button>
            </div>
          </form>
        </Tab>
      </Tabs>
    </div>
  );
}

export default Search;
