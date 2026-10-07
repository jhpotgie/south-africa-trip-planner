const GOOGLE = q => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const DIR = q => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;
const tripStart = new Date('2027-01-08T06:00:00+10:00');
const daysToGo = Math.ceil((tripStart - new Date()) / 86400000);
document.querySelector('#countdownValue').textContent = daysToGo > 0 ? daysToGo : daysToGo === 0 ? 'Today' : '✓';
document.querySelector('#countdownLabel').textContent = daysToGo > 0 ? 'days to go' : daysToGo === 0 ? 'departure day' : 'trip date passed';

const journey = [
 ['8–9 Jan','Johannesburg','Dainfern · 2 travellers'],
 ['9–12 Jan','Golden Gate','Kiara Lodge · 2'],
 ['12–18 Jan','Johannesburg','Dainfern · 2'],
 ['18–20 Jan','Victoria Falls','Shearwater · group becomes 10'],
 ['20–24 Jan','Lowveld + Sabi Sand','Nelspruit Lodge → Elephant Plains'],
 ['24–31 Jan','Western Cape → JHB','Franschhoek → Cape Town → Lanseria / Dainfern']
];
document.querySelector('#journeyStrip').innerHTML = journey.map(x => `
  <article class="journey__stop"><small>${x[0]}</small><h3>${x[1]}</h3><p>${x[2]}</p></article>
`).join('');

const tasks = [
 ['cpt-franschhoek','Arrange 24 Jan CPT Airport → Franschhoek','10 travellers + luggage after the 16:55 arrival.'],
 ['franschhoek-cpt','Arrange 26 Jan Franschhoek → Mountain Marina','10 travellers + luggage to the V&A Waterfront accommodation.']
];
const taskState = JSON.parse(localStorage.getItem('tripTasksV3') || '{}');
function renderTasks(){
  document.querySelector('#priorityTasks').innerHTML = tasks.map(([id,title,sub]) => `
    <label class="task ${taskState[id] ? 'is-done' : ''}">
      <input type="checkbox" data-task="${id}" ${taskState[id] ? 'checked' : ''}>
      <span><strong>${title}</strong><span>${sub}</span></span>
    </label>`).join('');
  document.querySelectorAll('[data-task]').forEach(el => el.onchange = e => {
    taskState[e.target.dataset.task] = e.target.checked;
    localStorage.setItem('tripTasksV3', JSON.stringify(taskState));
    renderTasks();
  });
}
renderTasks();

const stays = [
 {id:'jhb1',dates:'8–9 Jan',location:'Johannesburg · Dainfern',stay:'Jan’s parents',guests:'2 travellers',arrive:'QF65 lands OR Tambo 18:25 on 8 Jan',depart:'Drive to Kiara Lodge on 9 Jan',activities:[
  ['Recover from the long-haul flight','Keep the first evening intentionally easy.','Relaxation'],['Family meal / braai','A perfect first South African meal if everyone has energy.','Food']
 ]},
 {id:'kiara',dates:'9–12 Jan',location:'Golden Gate / Clarens',stay:'Kiara Lodge',guests:'2 travellers',arrive:'Drive from Dainfern',depart:'Drive back to Johannesburg on 12 Jan',activities:[
  ['Golden Gate Highlands hike','Brandwag Buttress for a shorter hike, or a longer trail if weather and energy suit.','Nature'],['Scenic park drive','Use the tarred loops for sandstone viewpoints and wildlife.','Nature'],['Ash River white-water rafting','Adventure option near Clarens; book with a reputable operator.','Adventure'],['Kiara adventure centre','Quad biking, rock climbing or gorge swing.','Adventure'],['Clarens village','Galleries, local produce, coffee and a relaxed wander.','Culture'],['Basotho Cultural Village','Add local cultural context to the Free State stay.','Culture'],['Braai night','Boerewors, roosterkoek and local sides rather than a generic dinner.','Food']
 ]},
 {id:'jhb2',dates:'12–18 Jan',location:'Johannesburg · Dainfern',stay:'Jan’s parents',guests:'2 travellers',arrive:'Drive from Kiara Lodge',depart:'Airlink 4Z494 JNB → Victoria Falls, 11:35 on 18 Jan',activities:[
  ['Apartheid Museum','Allow a few hours rather than rushing it.','Culture'],['Constitution Hill','South African legal and political history in a powerful setting.','Culture'],['Cradle of Humankind / Maropeng','Human-origins day trip west of Johannesburg.','Culture'],['Walter Sisulu Botanical Garden','Easy outdoor day with walking and birdlife.','Nature'],['Soweto with a reputable guided tour','Better done with a guide rather than independently.','Culture'],['Home braai / family day','Leave real downtime in the itinerary.','Food']
 ]},
 {id:'vicfalls',dates:'18–20 Jan',location:'Victoria Falls · Zimbabwe',stay:"Shearwater's Explorers Village",guests:'10 travellers',arrive:'Airlink 4Z494 lands VFA 13:20 on 18 Jan',depart:'Airlink 4Z477 VFA → KMIA, 14:00 on 20 Jan',activities:[
  ['Walk the Zimbabwe side of Victoria Falls','Expect heavy spray in January; quick-dry clothing and grippy shoes help.','Nature'],['Zambezi sunset cruise','A relaxed group activity after arrival or on the second evening.','Nature'],['White-water rafting','January is commonly high-water season; operation depends on river conditions.','Adventure'],['Flight of Angels','Helicopter view of the Falls and gorge.','Adventure'],['Bridge / gorge activities','Zipline, gorge swing or bungee for the adrenaline group.','Adventure'],['Dusty Road township dining experience','Open-fire Zimbabwean food and a strong sense of place.','Food']
 ]},
 {id:'casterbridge',dates:'20–21 Jan',location:'Nelspruit',stay:'Nelspruit Lodge',guests:'2 adults on this booking',arrive:'Airlink 4Z477 lands KMIA 15:40; lodge check-in from 14:00',depart:'Confirmed road transfer to Elephant Plains on 21 Jan',activities:[
  ['Settle in at Nelspruit Lodge','The confirmed Deluxe Double Room can be checked into until 23:30.','Relaxation'],['Easy Lowveld dinner','Keep the evening flexible after the flight and airport transfer.','Food'],['Early night before Sabi Sand','Allow enough time for the confirmed transfer to reach Elephant Plains for lunch / the afternoon drive.','Relaxation']
 ]},
 {id:'elephant',dates:'21–24 Jan',location:'Sabi Sand Game Reserve',stay:'Elephant Plains Game Lodge',guests:'10 travellers',arrive:'Confirmed road transfer from Nelspruit via Gowrie Gate',depart:'Confirmed transfer to Hoedspruit Airport for the 14:10 flight on 24 Jan',activities:[
  ['Morning game drives','Included lodge safari rhythm; sightings are never guaranteed.','Wildlife'],['Afternoon / evening game drives','Sundowners and the changing light are part of the experience.','Wildlife'],['Guided bush walk','Tracks, plants, birds and smaller wildlife with a guide.','Wildlife'],['Boma dinner','Weather-dependent lodge dining experience.','Food'],['Pool / downtime','Build in genuine rest between drives.','Relaxation'],['Wildlife photography / stargazing','Low-light evenings and open skies.','Nature']
 ]},
 {id:'franschhoek',dates:'24–26 Jan',location:'Franschhoek',stay:'The Manor House @ Roubaix Estate',guests:'10 travellers',arrive:'Airlink 4Z656 lands Cape Town 16:55; transfer to Franschhoek still to book',depart:'Transfer to Mountain Marina still to book for 26 Jan',activities:[
  ['Franschhoek Wine Tram','Recommended as the main full-day experience; route/times should be rechecked closer to Jan 2027.','Food'],['La Bri wine + biltong pairing','Distinctly South African tasting option.','Food'],['Mont Rochelle hike','Outdoor counterpoint to the wine estates.','Nature'],['Village walk','Shops, galleries and cafés around Franschhoek.','Culture'],['Long estate lunch','Choose one meal to linger over rather than racing between tastings.','Food'],['Huguenot Monument & museum','Quick cultural stop if the group wants context.','Culture']
 ]},
 {id:'capetown',dates:'26–29 Jan',location:'Cape Town · V&A Waterfront',stay:'Mountain Marina Luxury Apartments',guests:'10 travellers',arrive:'Transfer from Franschhoek still to book for 26 Jan',depart:'FlySafair FA302 departs Cape Town 10:05 on 29 Jan',activities:[
  ['Table Mountain hike or cableway','For a hike, go as a group in daylight and check weather conditions.','Nature'],['Cape Peninsula day','Chapman’s Peak, Cape Point and the coast.','Nature'],['Boulders Beach penguins','Easy to combine with the Peninsula route.','Wildlife'],['Kirstenbosch Botanical Garden','A strong outdoor / flora option without a full hike.','Nature'],['Bo-Kaap food + heritage','Pair the neighbourhood with Cape Malay food rather than just photos.','Culture'],['Lion’s Head','Popular active option; choose daylight / guided conditions.','Adventure'],['Atlantic Seaboard sunset','Simple, scenic and flexible.','Relaxation'],['Cape Flats food mission','Gatsby / roadhouse / koesister stops for a less touristy food experience.','Food']
 ]},
 {id:'jhb3',dates:'29–31 Jan',location:'Johannesburg · Dainfern',stay:'Jan’s parents',guests:'10 travellers',arrive:'FlySafair FA302 lands Lanseria at 12:20 on 29 Jan',depart:'Jan + partner depart OR Tambo on QF66 at 21:35 on 31 Jan',activities:[
  ['Group braai','An easy final shared South African meal.','Food'],['Soweto + Chaf Pozi','Guided Soweto experience followed by shisa nyama / pap / chakalaka.','Food'],['Cradle / local activity catch-up','Use this as a backup if the earlier Johannesburg days stayed quiet.','Culture'],['Final shopping / downtime','Keep space before the long-haul departure.','Relaxation']
 ]}
];
let activityState = JSON.parse(localStorage.getItem('tripStayActivitiesV3') || '{}');
function tagClass(t){
  return {'Adventure':'tag--adventure','Nature':'tag--nature','Culture':'tag--culture','Food':'tag--food','Relaxation':'tag--relax','Wildlife':'tag--wildlife'}[t] || '';
}
function renderStays(){
  const root = document.querySelector('#stayList');
  root.innerHTML = stays.map((s, i) => `
    <article class="stay-card ${i===1 ? 'is-open' : ''}" data-stay="${s.id}">
      <div class="stay-card__head">
        <div class="stay-card__dates">${s.dates}</div>
        <div class="stay-card__title">
          <h3>${s.location}</h3>
          <p>${s.stay}</p>
          <div class="stay-card__meta"><span class="meta-chip">👥 ${s.guests}</span><span class="meta-chip">📍 ${s.location}</span></div>
        </div>
        <button class="stay-card__toggle" aria-label="Open stay">+</button>
      </div>
      <div class="stay-card__body">
        <div class="stay-facts"><div class="stay-fact"><small>Arrive</small><strong>${s.arrive}</strong></div><div class="stay-fact"><small>Depart</small><strong>${s.depart}</strong></div></div>
        <div class="suggested-title"><h4>Suggested activities</h4><span>Pick what suits the group</span></div>
        <div class="suggestion-checks">${s.activities.map((a, idx) => {
          const key = `${s.id}|${idx}`;
          return `<label class="suggestion ${activityState[key] ? 'is-done' : ''}"><input type="checkbox" data-activity="${key}" ${activityState[key] ? 'checked' : ''}><span><strong>${a[0]}</strong><p>${a[1]}</p></span><em class="tag ${tagClass(a[2])}">${a[2]}</em></label>`;
        }).join('')}</div>
      </div>
    </article>`).join('');
  document.querySelectorAll('.stay-card__toggle').forEach(btn => btn.onclick = () => btn.closest('.stay-card').classList.toggle('is-open'));
  document.querySelectorAll('[data-activity]').forEach(el => el.onchange = e => {
    activityState[e.target.dataset.activity] = e.target.checked;
    localStorage.setItem('tripStayActivitiesV3', JSON.stringify(activityState));
    renderStays();
  });
}
renderStays();

const bookings = [
 ['✈️','Qantas · Brisbane → Johannesburg','8 Jan 2027 · QF933 BNE 06:00 → PER 09:25 · QF65 PER 13:15 → JNB 18:25','confirmed',['2 travellers']],
 ['🏠','Dainfern family stay','8–9 Jan, 12–18 Jan, 29–31 Jan','owner',['Jan’s parents']],
 ['🏔️','Kiara Lodge','9–12 Jan · Golden Gate / Clarens','owner',['2 travellers','Driving']],
 ['✈️','Airlink · Johannesburg → Victoria Falls','18 Jan · 4Z494 · 11:35 → 13:20','confirmed',['Jan’s regional ticket']],
 ['🛏️',"Shearwater's Explorers Village",'18–20 Jan · Victoria Falls','confirmed',['5 rooms','10 adults','Breakfast']],
 ['✈️','Airlink · Victoria Falls → KMIA','20 Jan · 4Z477 · 14:00 → 15:40','confirmed',['Regional flight']],
 ['🛏️','Nelspruit Lodge','20–21 Jan · 3 Webb Street, Nelspruit','confirmed',['1 Deluxe Double Room','2 adults']],
 ['🚐','Nelspruit Lodge → Elephant Plains','21 Jan · road transfer to the game lodge','confirmed',['Transfer confirmed']],
 ['🐘','Elephant Plains Game Lodge','21–24 Jan · Sabi Sand','owner',['10 travellers','Transfers confirmed']],
 ['🚐','Elephant Plains → Hoedspruit Airport','24 Jan · transfer for the 14:10 flight','confirmed',['Transfer confirmed']],
 ['✈️','Airlink · Hoedspruit → Cape Town','24 Jan · 4Z656 · 14:10 → 16:55','confirmed',['Regional flight']],
 ['🚐','Cape Town Airport → Franschhoek','24 Jan · after the 16:55 arrival','todo',['10 travellers + luggage']],
 ['🏡','The Manor House @ Roubaix Estate','24–26 Jan · Franschhoek','confirmed',['10 adults']],
 ['🚐','Franschhoek → Mountain Marina','26 Jan · V&A Waterfront accommodation','todo',['10 travellers + luggage']],
 ['🏙️','Mountain Marina Luxury Apartments','26–29 Jan · V&A Waterfront','confirmed',['2 apartments','10 adults']],
 ['✈️','FlySafair · Cape Town → Lanseria','29 Jan · FA302 · 10:05 → 12:20','confirmed',['2 travellers','Checked bags']],
 ['✈️','Qantas · Johannesburg → Brisbane','31 Jan QF66 JNB 21:35 → PER 1 Feb 13:15 · QF946 PER 15:25 → BNE 22:00','confirmed',['2 travellers']]
];
const pillLabel = {confirmed:'Confirmed', owner:'Confirmed by you', todo:'To book / confirm'};
document.querySelector('#bookingList').innerHTML = bookings.map(b => `
  <article class="booking"><div class="booking__icon">${b[0]}</div><div><h3>${b[1]}</h3><p>${b[2]}</p><div class="booking__meta">${b[4].map(x => `<span>${x}</span>`).join('')}</div></div><span class="pill pill--${b[3]}">${pillLabel[b[3]]}</span></article>
`).join('');

const explore = {
 'Golden Gate / Clarens':[
  ['🥾','Golden Gate Highlands National Park','Sandstone scenery, hiking and scenic drives.',['Hiking','Nature'],'https://www.sanparks.org/parks/golden-gate-highlands'],
  ['🛶','Ash River rafting','A strong active-day option near Clarens; conditions and operators vary.',['Adventure','Water'],'https://www.clarensxtreme.co.za/'],
  ['🧗','Kiara / Leap Adventures','Quad biking, rock climbing, gorge swing and other on-site options.',['Adventure'],'https://www.kiaralodgeresort.co.za/facilities'],
  ['🎨','Clarens village','Galleries, small shops, cafés and local produce.',['Culture','Easy'],'https://www.clarens.co.za/']
 ],
 'Johannesburg':[
  ['🏛️','Apartheid Museum','Essential context for modern South African history.',['Culture','History'],'https://www.apartheidmuseum.org/'],
  ['⚖️','Constitution Hill','Former prison complex and home of the Constitutional Court.',['Culture','History'],'https://www.constitutionhill.org.za/'],
  ['🦴','Cradle of Humankind','Maropeng / Sterkfontein area west of Johannesburg.',['Outdoors','History'],'https://www.maropeng.co.za/'],
  ['🌿','Walter Sisulu Botanical Garden','Easy outdoor time and birdlife.',['Nature','Easy'],'https://www.sanbi.org/gardens/walter-sisulu/']
 ],
 'Victoria Falls':[
  ['💦','Victoria Falls National Park','Walk the rainforest viewpoints on the Zimbabwe side.',['Nature','Iconic'],'https://www.zimparks.org.zw/victoria-falls-national-park/'],
  ['🚁','Flight of Angels','Helicopter flight over the Falls and gorge.',['Adventure','View'],'https://www.shearwatervictoriafalls.com/activities/helicopter-flights/'],
  ['🌊','Zambezi rafting','High-water operations are seasonal and condition-dependent.',['Adventure','Water'],'https://www.shearwatervictoriafalls.com/activities/white-water-rafting/'],
  ['🛥️','Sunset cruise','A relaxed wildlife-and-river option for the whole group.',['Wildlife','Relaxed'],'https://www.shearwatervictoriafalls.com/activities/zambezi-river-cruises/']
 ],
 'White River / Lowveld':[
  ['🛍️','Casterbridge Lifestyle Centre','Local shops, galleries and an easy arrival-evening wander.',['Easy','Local'],'https://www.casterbridgehollow.co.za/'],
  ['⛰️','Panorama Route','Blyde River Canyon, viewpoints and waterfalls — better as a dedicated half/full day if timing changes.',['Scenic','Road trip'],'https://www.casterbridgehollow.co.za/play/']
 ],
 'Sabi Sand':[
  ['🐆','Game drives','Elephant Plains includes two game drives per day.',['Wildlife','Included'],'https://elephantplains.co.za/'],
  ['👣','Bush walk','Guided walking safari focused on tracks, plants and smaller wildlife.',['Wildlife','Walking'],'https://elephantplains.co.za/'],
  ['📷','Photography / stargazing','Use the quieter lodge time between drives.',['Nature','Relaxed'],'https://elephantplains.co.za/']
 ],
 'Franschhoek':[
  ['🚋','Franschhoek Wine Tram','A full-day wine-valley experience; recheck Jan 2027 route/times.',['Wine','Full day'],'https://winetram.co.za/','wine'],
  ['🥾','Mont Rochelle Nature Reserve','Hiking above the valley.',['Hiking','Nature'],'https://montrochellehiking.co.za/'],
  ['🍷','Estate tastings','Pick fewer estates and spend longer at each.',['Wine','Relaxed'],'https://franschhoek.org.za/']
 ],
 'Cape Town':[
  {icon:'🚠',title:'Table Mountain by cableway',text:'The simplest route to the summit. Check the live operating status and queue before leaving; high wind can stop the cableway.',tags:['Iconic','View','Half day'],url:'https://www.tablemountain.net/',linkLabel:'Official cableway',map:'Table Mountain Aerial Cableway',pace:'half',activityTime:'1½–2½ hr on top',transitTime:'20–30 min each way',totalTime:'3½–5 hr total'},
  {icon:'🥾',title:'Guided Table Mountain hike · India Venster',text:'A challenging, scenic summit route with a qualified mountain guide. Atlantic Outlook supplies safety equipment and descends by cableway when it is operating.',tags:['Hiking','Adventure','Full day'],url:'https://www.atlanticoutlook.com/pages/table-mountain-hike-booking',linkLabel:'Recommended · Atlantic Outlook',map:'Table Mountain Aerial Cableway',pace:'full',activityTime:'5–7 hr round trip',transitTime:'20–30 min each way',totalTime:'6–8 hr total'},
  {icon:'🌅',title:'Guided Lion’s Head hike',text:'A sunrise or sunset climb with a qualified guide, head torches and safety equipment. Some steep sections use chains and ladders.',tags:['Hiking','View','Half day'],url:'https://www.atlanticoutlook.com/pages/lions-head-hike-booking',linkLabel:'Recommended · Atlantic Outlook',map:'Lion’s Head Trail',pace:'half',activityTime:'3–4 hr hike',transitTime:'15–25 min each way',totalTime:'4–5 hr total'},
  {icon:'🐧',title:'Private Cape Peninsula + Boulders',text:'A flexible group day via Camps Bay, Chapman’s Peak, Cape Point and the penguins. Wanderer is recommended for private pickup and adjustable pacing for 10.',tags:['Road trip','Wildlife','Full day'],url:'https://wanderer.capetown/cape-town-day-tours/cape-point-tour/',linkLabel:'Recommended · Wanderer',map:'Boulders Beach Penguin Colony',pace:'full',activityTime:'Stops throughout the day',transitTime:'Pickup + driving included',totalTime:'8–9 hr door-to-door'},
  {icon:'🦈',title:'Shark cage diving · Gansbaai',text:'Marine Dynamics is the pick for its marine biologist, purpose-built boats and conservation programme. Shark species and sightings are never guaranteed.',tags:['Adventure','Wildlife','Full day'],url:'https://sharkwatchsa.com/shark-cage-diving-cape-town/',linkLabel:'Recommended · Marine Dynamics',map:'Marine Dynamics Shark Tours Kleinbaai',pace:'full',activityTime:'2–3 hr anchored + briefing',transitTime:'About 2½ hr each way',totalTime:'10–12 hr door-to-door'},
  {icon:'🤿',title:'Ocean safari + kelp snorkel',text:'Search for seals, dolphins, sunfish and seabirds from Hout Bay, with a guided kelp snorkel if conditions suit. Animal Ocean offers a private boat for exactly 10.',tags:['Adventure','Wildlife','Half day'],url:'https://www.animalocean.co.za/ocean-safari-kelp-snorkeling-cape-town',linkLabel:'Recommended · Animal Ocean',map:'Animal Ocean Hout Bay',pace:'half',activityTime:'4 hr on the water',transitTime:'35–50 min each way',totalTime:'5½–6 hr total'},
  {icon:'🛶',title:'Kayak from the V&A Waterfront',text:'A guided paddle along the Atlantic Seaboard toward Green Point. It starts nearby and works well when the group wants activity without losing half the day.',tags:['Water','Wildlife','Quick'],url:'https://www.atlanticoutlook.com/',linkLabel:'Recommended · Atlantic Outlook',map:'Atlantic Outlook Kayak Tours',pace:'quick',activityTime:'2 hr paddle',transitTime:'10–20 min walk/check-in',totalTime:'2½–3 hr total'},
  {icon:'🪂',title:'Tandem paragliding',text:'Fly from Signal Hill or Lion’s Head depending on wind. This SAHPA-approved, SACAA-licensed operator is the preferred link; flight length cannot be guaranteed.',tags:['Adventure','View','Quick'],url:'https://www.paraglide.co.za/',linkLabel:'Recommended · CT Tandem Paragliding',map:'Signal Hill Cape Town',pace:'quick',activityTime:'Allow 1½–2 hr for check-in/flight',transitTime:'15–25 min each way',totalTime:'2½–3½ hr total'},
  {icon:'🏄',title:'Learn to surf at Muizenberg',text:'A beginner-friendly group lesson with wetsuits and boards. Gary’s is South Africa’s original surf school and schedules lessons around the tide.',tags:['Adventure','Water','Half day'],url:'https://garysurf.com/surf-lessons',linkLabel:'Recommended · Gary’s Surf School',map:'Gary’s Surf School Muizenberg',pace:'half',activityTime:'2 hr lesson/practice',transitTime:'40–60 min each way',totalTime:'4–4½ hr total'},
  {icon:'🏘️',title:'Bo-Kaap with a resident guide',text:'Choose the 1½-hour heritage walk and tea, a tour with lunch, or the 3½-hour Cape Malay cooking class. All are led by guides who live in Bo-Kaap.',tags:['Culture','Food','Half day'],url:'https://www.bokaaptours.com/tours',linkLabel:'Recommended · Bo-Kaap Tours',map:'Bo-Kaap Cape Town',pace:'half',activityTime:'1½–3½ hr option',transitTime:'10–20 min each way',totalTime:'2½–5 hr total'},
  {icon:'🏖️',title:'Clifton + Camps Bay sunset',text:'An easy choose-your-own afternoon: beach time, the promenade, dinner or sunset beneath the Twelve Apostles. Atlantic water is cold and summer traffic can be slow.',tags:['Beach','Sunset','Half day'],url:'https://www.capetown.travel/neighbourhood/camps-bay/',linkLabel:'Cape Town Tourism guide',map:'Camps Bay Beach',pace:'half',activityTime:'2–4 hr at the coast',transitTime:'20–30 min each way',totalTime:'3–5 hr total'},
  {icon:'⛴️',title:'Robben Island',text:'The official standard tour combines the ferries, island bus and former prison. It leaves from the V&A Waterfront; book ahead and expect weather-related changes.',tags:['History','Culture','Half day'],url:'https://www.robben-island.org.za/tour-types/',linkLabel:'Official tickets · Robben Island',map:'Nelson Mandela Gateway To Robben Island',pace:'half',activityTime:'3½–4 hr tour incl. ferry',transitTime:'5–15 min walk each way',totalTime:'4–4½ hr total'},
  {icon:'🌿',title:'Kirstenbosch Botanical Garden',text:'Explore the garden and canopy walkway on Table Mountain’s eastern slopes. A strong outdoor option when the group wants nature without a summit hike.',tags:['Nature','Easy','Half day'],url:'https://www.sanbi.org/gardens/kirstenbosch/',linkLabel:'Official garden details',map:'Kirstenbosch National Botanical Garden',pace:'half',activityTime:'2½–3½ hr in garden',transitTime:'25–40 min each way',totalTime:'4–5 hr total'},
  {icon:'🍷',title:'Groot Constantia',text:'A closer-to-town alternative to another Winelands day: manor house, cellar, tasting or chocolate pairing, with lunch if the group wants to linger.',tags:['Wine','History','Half day'],url:'https://grootconstantia.co.za/experience-groot-constantia/',linkLabel:'Official visitor route',map:'Groot Constantia',pace:'half',activityTime:'2–4 hr at estate',transitTime:'30–45 min each way',totalTime:'4–6 hr total'},
  {icon:'🖼️',title:'Zeitz MOCAA',text:'Contemporary art from Africa and its diaspora in the converted grain silo. This is one of the easiest weather-proof options from Mountain Marina.',tags:['Art','Culture','Quick'],url:'https://zeitzmocaa.museum/plan-your-visit/',linkLabel:'Official museum details',map:'Zeitz Museum of Contemporary Art Africa',pace:'quick',activityTime:'2–3 hr in museum',transitTime:'5–15 min walk each way',totalTime:'2½–3½ hr total'},
  {icon:'🐠',title:'Two Oceans Aquarium',text:'A low-logistics, weather-proof look at southern African marine life in the Waterfront. Good for a split group or an easy recovery day.',tags:['Wildlife','Easy','Quick'],url:'https://www.aquarium.co.za/visit-us/plan-your-trip',linkLabel:'Official aquarium details',map:'Two Oceans Aquarium',pace:'quick',activityTime:'2–3 hr inside',transitTime:'5–15 min walk each way',totalTime:'2½–3½ hr total'},
  {icon:'🥙',title:'Wednesday night food market',text:'The Cape Town stay includes Wednesday 27 January. Oranjezicht’s current schedule makes its night market an easy local-food option; reconfirm the 2027 hours.',tags:['Food','Local','Quick'],url:'https://ozcf.co.za/ozcfmarket/',linkLabel:'Official · Oranjezicht Market',map:'Oranjezicht City Farm Market',pace:'quick',activityTime:'1½–3 hr at market',transitTime:'10–20 min walk each way',totalTime:'2–3½ hr total'},
  {icon:'⛵',title:'Waterfront sunset cruise',text:'A low-effort evening on Table Bay with city and mountain views. Keep it flexible because wind can change or cancel sailings.',tags:['Sunset','Relaxed','Quick'],url:'https://www.waterfront.co.za/attractions/waterfront-charters',linkLabel:'Operator details · Waterfront Charters',map:'Waterfront Charters Cape Town',pace:'quick',activityTime:'1½ hr cruise + check-in',transitTime:'5–15 min walk each way',totalTime:'2–2½ hr total'}
 ]
};
const destinations = ['Cape Town', ...Object.keys(explore).filter(destination => destination !== 'Cape Town')];
document.querySelector('#destinationNav').innerHTML = destinations.map((d, i) => `<button class="filter-chip ${i===0 ? 'is-active' : ''}" data-dest="${d}">${d}</button>`).join('');
let capePace = 'all';
function normaliseExploreActivity(activity, destination){
  if(!Array.isArray(activity)) return activity;
  return {icon:activity[0],title:activity[1],text:activity[2],tags:activity[3],url:activity[4],special:activity[5],map:`${activity[1]} ${destination}`};
}
function renderExplore(dest){
  const allActivities = explore[dest].map(activity => normaliseExploreActivity(activity, dest));
  const visibleActivities = dest === 'Cape Town' && capePace !== 'all' ? allActivities.filter(activity => activity.pace === capePace) : allActivities;
  const capePlanner = dest === 'Cape Town' ? `
    <div class="cape-planner">
      <div><span class="cape-planner__kicker">26–29 JAN · STARTING AT MOUNTAIN MARINA</span><strong>Choose your own Cape Town adventure</strong><p>Door-to-door estimates include typical travel from the V&A Waterfront, check-in and a little buffer. Traffic, queues and Cape weather can stretch them, so reconfirm exact pickup times when booking.</p></div>
      <div class="cape-planner__filters" aria-label="Filter Cape Town activities by time commitment">
        ${[['all','All options'],['quick','Quick · up to 3½ hr'],['half','Half day'],['full','Full day']].map(([value,label]) => `<button class="filter-chip ${capePace===value ? 'is-active' : ''}" type="button" data-cape-pace="${value}" aria-pressed="${capePace===value}">${label}</button>`).join('')}
      </div>
    </div>` : '';
  document.querySelector('#exploreList').innerHTML = `
    <section class="destination-block"><h3>${dest}</h3>${capePlanner}<div class="cards ${dest === 'Cape Town' ? 'cards--cape-town' : ''}">${visibleActivities.map(a => `
      <article class="activity"><div class="activity__icon">${a.icon}</div><h4>${a.title}</h4><p>${a.text}</p><div class="activity__tags">${a.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>${a.totalTime ? `<div class="activity__timing"><div><small>Activity</small><strong>${a.activityTime}</strong></div><div><small>Transit</small><strong>${a.transitTime}</strong></div><div class="activity__timing-total"><small>Allow</small><strong>${a.totalTime}</strong></div></div>` : ''}<div class="activity__links"><a href="${a.url}" target="_blank" rel="noopener">${a.linkLabel || 'Current details'} ↗</a>${a.special==='wine' ? '<button class="link-button" data-wine-plan>Suggested plan</button>' : `<a href="${GOOGLE(a.map || `${a.title} ${dest}`)}" target="_blank" rel="noopener">Map ↗</a>`}</div></article>
    `).join('')}</div></section>`;
  document.querySelectorAll('[data-wine-plan]').forEach(b => b.onclick = showWinePlan);
  document.querySelectorAll('[data-cape-pace]').forEach(button => button.onclick = () => {
    capePace = button.dataset.capePace;
    renderExplore('Cape Town');
  });
}
renderExplore(destinations[0]);
document.querySelectorAll('[data-dest]').forEach(b => b.onclick = () => {
  document.querySelectorAll('[data-dest]').forEach(x => x.classList.remove('is-active'));
  b.classList.add('is-active');
  renderExplore(b.dataset.dest);
});
function showWinePlan(){
  content.innerHTML = `<div class="dialog__inner"><div class="eyebrow eyebrow--dark">FRANSCHHOEK · OPTIONAL PLAN</div><h2>A relaxed Wine Tram day</h2><p>This is a suggested shape for the day, not a fixed itinerary. The current Blue Line is a practical fit for your Cabriere Street stay, but January 2027 routes and times need reconfirmation before booking.</p><div class="wine-plan"><div class="wine-stop"><div><strong>Morning</strong></div><div><strong>La Bri</strong><p>Start with the wine + biltong pairing — a distinctively South African first stop.</p></div></div><div class="wine-stop"><div><strong>Late morning</strong></div><div><strong>Holden Manz</strong><p>Make this the longer stop and pre-book a proper estate lunch rather than squeezing food between tastings.</p></div></div><div class="wine-stop"><div><strong>Early afternoon</strong></div><div><strong>Rickety Bridge</strong><p>One relaxed tasting and a wander; keep the pace easy after lunch.</p></div></div><div class="wine-stop"><div><strong>Mid-afternoon</strong></div><div><strong>Grande Provence</strong><p>Finish with a final tasting / estate stroll and return to town with time before dinner.</p></div></div></div><h3>Why only four stops?</h3><ul><li>It keeps the group together without racing the timetable.</li><li>There is one proper lunch, not four tasting-room snacks.</li><li>La Bri adds the biltong pairing you wanted from the food side of the trip.</li><li>You still have room to swap an estate once the 2027 Wine Tram timetable is published.</li></ul><p><a href="https://winetram.co.za/" target="_blank" rel="noopener">Check current Wine Tram routes ↗</a></p></div>`;
  dialog.showModal();
}

const foods = {
 'Johannesburg / Soweto':[
  {name:'Chaf Pozi',icon:'🔥',tags:['Shisa nyama','Braai','Pap','Chakalaka'],text:'At Orlando Towers: choose meat and have the braai team cook it. More place-and-food experience than polished restaurant dining.',url:'https://www.chafpozi.co.za/'},
  {name:'Family braai in Dainfern',icon:'🍖',tags:['Boerewors','Braai','Potjie','Roosterkoek'],text:'Not a restaurant — but arguably one of the most authentic meals of the trip. Use a family night for a proper braai or potjie.',url:''}
 ],
 'Golden Gate / Clarens':[
  {name:'Kiara braai / self-catering night',icon:'🥩',tags:['Braai','Boerewors','Roosterkoek','Biltong'],text:'Use the lodge setting for a simple South African meal rather than treating every night as a restaurant night.',url:'https://www.kiaralodgeresort.co.za/'},
  {name:'Clarens local-produce stop',icon:'🧺',tags:['Farm stall','Biltong','Local produce'],text:'Treat Clarens as a grazing stop for regional produce, biltong and bakery items rather than chasing a generic “best restaurant”.',url:'https://www.clarens.co.za/'}
 ],
 'Victoria Falls':[
  {name:'Dusty Road Township Experience',icon:'🍲',tags:['Zimbabwean','Sadza','Open-fire cooking'],text:'Food in Chinotimba township cooked over open fires and in cast-iron pots; a strong fit for your “eat the place” brief.',url:'https://wearevictoriafalls.com/dusty-road-township-dining-experience'},
  {name:'Boma-style dinner',icon:'🥁',tags:['Open fire','Game meats','Group experience'],text:'More theatrical than Dusty Road, but a fun group meal if you want drumming and an African buffet-style evening.',url:'https://www.victoria-falls-safari-lodge.com/boma-dinner-drum-show/'}
 ],
 'White River / Lowveld':[
  {name:'Dave’s Kitchen',icon:'🍛',tags:['Pap','Beef stew','Inhloko','Matfumbu','Chakalaka'],text:'Very casual local food. Your arrival day is tight, so treat this as a timing-dependent option.',url:'https://daveskitchen.online/'},
  {name:'Magnolia Restaurant',icon:'🍷',tags:['South African wine','Convenient'],text:'Opposite Casterbridge Hollow. Less “traditional”, but useful as the easy fallback after the flight and road transfer.',url:'https://www.casterbridgehollow.co.za/eat/'}
 ],
 'Sabi Sand / Elephant Plains':[
  {name:'Elephant Plains boma dinner',icon:'🌙',tags:['Boma','Braai','Lodge dining'],text:'Weather permitting, use one lodge evening for the open-air boma experience; meals are part of the safari stay.',url:'https://elephantplains.co.za/'}
 ],
 'Franschhoek':[
  {name:'La Bri',icon:'🥓',tags:['Wine','Biltong pairing'],text:'A compact, distinctly South African wine-and-biltong pairing on the Wine Tram network.',url:'https://winetram.co.za/featured_item/la-bri-wine-estate/'},
  {name:'Holden Manz',icon:'🍽️',tags:['Winelands','Local produce','Estate lunch'],text:'Not “traditional food” in a strict sense, but a very good expression of the Cape Winelands: local produce, long lunch and estate wine.',url:'https://holdenmanz.com/pages/wine-dine'}
 ],
 'Cape Town':[
  {name:'Bo-Kaap Kombuis',icon:'🍛',tags:['Cape Malay','Bobotie','Denningvleis','Malva pudding'],text:'A heritage-focused Cape Malay meal in the Bo-Kaap; book ahead for a group of 10.',url:'https://bokaapkombuis.co.za/'},
  {name:'Biesmiellah',icon:'🥘',tags:['Cape Malay','Tomato bredie','Bobotie','Breyani'],text:'Long-running family restaurant in the Bo-Kaap with classic Cape Malay and Cape Indian dishes.',url:'https://www.biesmiellah.co.za/'},
  {name:'Super Fisheries',icon:'🥪',tags:['Gatsby','Cape Flats'],text:'Cape Town Tourism identifies Super Fisheries in Athlone with the origins of the Gatsby. Buy one to share — that is part of the point.',url:'https://www.capetown.travel/whats-hot-on-cape-towns-fast-food-scene/'},
  {name:'Wembley Roadhouse',icon:'🍟',tags:['Roadhouse','Curries','Samoosas'],text:'Old-school Cape Town roadhouse culture and a good alternative / second stop on a Cape Flats food mission.',url:'https://www.wembley.co.za/roadhouse/'},
  {name:'Rose Corner Café / Bo-Kaap Deli',icon:'🍩',tags:['Koesister','Bakery','Cape Malay'],text:'Use a Bo-Kaap walk to try the round, spiced Cape Malay koesister — different from the plaited syrupy koeksister.',url:'https://www.capetown.travel/the-travellers-guide-to-bo-kaap/'},
  {name:'Seven Colours Eatery',icon:'🍲',tags:['Umleqwa','Tshisanyama','Mogodu','Umngqusho'],text:'Conveniently near your V&A accommodation and built around South African home-style dishes.',url:'https://www.waterfront.co.za/eat-and-drink/seven-colours-eatery'}
 ]
};
let activeFoodTag = localStorage.getItem('tripFoodFilterV32') || '';
const allFoodTags = [...new Set(Object.values(foods).flat().flatMap(item => item.tags))].sort((a,b) => a.localeCompare(b));
function toggleFoodTag(tag){
  activeFoodTag = activeFoodTag === tag ? '' : tag;
  localStorage.setItem('tripFoodFilterV32', activeFoodTag);
  renderFoodFilters();
  renderFoodGroups();
}
function renderFoodFilters(){
  const filters = ['ALL', ...allFoodTags];
  document.querySelector('#foodQuest').innerHTML = filters.map(tag => {
    const active = tag === 'ALL' ? !activeFoodTag : activeFoodTag === tag;
    const label = tag === 'ALL' ? 'Show all' : tag;
    return `<button class="quest ${active ? 'is-active' : ''}" data-food-filter="${tag}">${label}</button>`;
  }).join('');
  document.querySelectorAll('[data-food-filter]').forEach(btn => btn.onclick = () => {
    const tag = btn.dataset.foodFilter;
    if(tag === 'ALL') {
      activeFoodTag = '';
      localStorage.setItem('tripFoodFilterV32', activeFoodTag);
      renderFoodFilters();
      renderFoodGroups();
      return;
    }
    toggleFoodTag(tag);
  });
}
function matchesFoodFilters(item){
  if(!activeFoodTag) return true;
  return item.tags.includes(activeFoodTag);
}
function renderFoodGroups(){
  const root = document.querySelector('#foodGroups');
  root.innerHTML = Object.entries(foods).map(([loc, items]) => {
    const filtered = items.filter(matchesFoodFilters);
    if(!filtered.length) return '';
    return `<section class="food-group"><h3>${loc}</h3><div class="food-list">${filtered.map(f => `
      <article class="food"><div class="food__thumb">${f.icon}</div><h4>${f.name}</h4><div class="food__tags">${f.tags.map(t => `<button class="tag tag--food ${activeFoodTag === t ? 'is-active' : ''}" data-food-filter="${t}">${t}</button>`).join('')}</div><p>${f.text}</p>${f.url ? `<a href="${f.url}" target="_blank" rel="noopener">Check current details ↗</a>` : ''}</article>
    `).join('')}</div></section>`;
  }).join('') || `<div class="notice notice--amber"><strong>No matches</strong><p>Try a different tag or switch back to Show all.</p></div>`;
  document.querySelectorAll('#foodGroups [data-food-filter]').forEach(btn => btn.onclick = () => toggleFoodTag(btn.dataset.foodFilter));
}
renderFoodFilters();
renderFoodGroups();

const tastingGroups = [
  {
    title:'Savoury, smoky & street-side',
    intro:'Start with the portable snacks, then work up to the dishes worth building a meal around.',
    items:[
      {id:'biltong',icon:'🥩',name:'Biltong',badge:'Essential',text:'Air-cured, seasoned meat—usually beef or game. It is generally thicker, meatier and less sweet than American jerky.',tip:'Try a few cuts from a proper butcher or padstal; ask for lean, medium or fatty.'},
      {id:'droewors',icon:'〰️',name:'Droëwors',badge:'Road-trip snack',text:'Dry-cured sausage with the coriander-led flavour of boerewors in an easy-to-pack snack.',tip:'Say “DROO-uh-vors.” Buy a bag alongside the biltong for padkos.'},
      {id:'boerewors-roll',icon:'🌭',name:'Boerewors roll',badge:'Braai classic',text:'Coiled, coarsely minced South African sausage cooked over the coals and tucked into a roll.',tip:'Order a “boerie” with grilled onions and chakalaka if offered.'},
      {id:'bunny-chow',icon:'🍛',name:'Bunny chow',badge:'Street food',text:'Durban-style curry served inside a hollowed loaf of bread. Despite the name, there is no rabbit involved.',tip:'A quarter-loaf is plenty for many people; use the bread lid to mop up the curry.'},
      {id:'bobotie',icon:'🥘',name:'Bobotie',badge:'Cape classic',text:'Gently spiced minced meat, often with fruit or chutney notes, baked beneath a savoury egg-and-milk topping.',tip:'A good Cape Malay meal is the natural place to look for it.'},
      {id:'pap-chakalaka',icon:'🔥',name:'Pap, chakalaka & shisa nyama',badge:'Eat together',text:'Maize porridge, spicy vegetable relish and meat grilled over fire—a combination built for sharing.',tip:'Try it at a braai or a reputable township dining experience rather than in isolation.'},
      {id:'potjiekos',icon:'🍲',name:'Potjiekos',badge:'Slow food',text:'Meat and vegetables slowly cooked over coals in a three-legged cast-iron pot until rich and tender.',tip:'Best found at a family gathering, lodge dinner or venue that has time to cook it properly.'},
      {id:'gatsby',icon:'🥖',name:'Cape Town Gatsby',badge:'Share it',text:'An enormous Cape sandwich packed with hot chips and fillings such as steak, chicken, polony or calamari.',tip:'Order one for the table—the over-the-top scale is part of the experience.'}
    ]
  },
  {
    title:'Something sweet',
    intro:'South Africa does sticky, creamy and nostalgic desserts exceptionally well. The two similarly named fried treats are deliberately separate.',
    items:[
      {id:'koeksister',icon:'🍩',name:'Koeksister',badge:'Syrupy',text:'A plaited fried pastry soaked in cold syrup, with a crisp shell and very sweet, sticky centre.',tip:'Have one fresh with coffee; sharing is sensible if you are easing into the sweetness.'},
      {id:'koesister',icon:'🥥',name:'Cape Malay koesister',badge:'Cape Town',text:'A soft, round, warmly spiced doughnut finished with syrup and coconut—distinct from the plaited koeksister.',tip:'A Sunday-morning bakery stop in Cape Town is the classic mission.'},
      {id:'malva-pudding',icon:'🍮',name:'Malva pudding',badge:'Warm dessert',text:'A soft caramelised sponge served warm with a rich cream sauce, custard or ice cream.',tip:'Ideal after a braai or Cape meal; one of the easiest crowd-pleasers on the list.'},
      {id:'melktert',icon:'🥧',name:'Melktert',badge:'Bakery stop',text:'A delicate milk-custard tart dusted with cinnamon, usually lighter than an American custard pie.',tip:'Try a slice from a bakery or farm stall with tea or coffee.'},
      {id:'peppermint-crisp-tart',icon:'🍫',name:'Peppermint Crisp tart',badge:'Nostalgic',text:'A no-bake fridge tart layered with biscuits, caramel, cream and peppermint-chocolate crunch.',tip:'Look for it at a family table, casual restaurant or home-style deli.'}
    ]
  },
  {
    title:'Sip, sundowner & party round',
    intro:'A mix of genuinely local signatures and one requested international party favourite. Alcohol-free rooibos absolutely counts.',
    items:[
      {id:'rooibos',icon:'🫖',name:'Rooibos tea',badge:'No alcohol',text:'Naturally caffeine-free herbal tea indigenous to South Africa, with an earthy, gently sweet character.',tip:'Try it plain first, then with milk, lemon or honey if that is how your host serves it.'},
      {id:'cape-wine',icon:'🍷',name:'Pinotage or Cape Chenin Blanc',badge:'Winelands',text:'Pinotage is South Africa’s signature red grape; Chenin Blanc is another Cape strength with styles from crisp to rich.',tip:'Choose a guided tasting and let the group compare styles rather than chasing quantity.'},
      {id:'amarula',icon:'🧊',name:'Amarula',badge:'Local liqueur',text:'Cream liqueur made with marula fruit, usually poured over ice or used in dessert cocktails.',tip:'Treat it as a small after-dinner pour—it is sweet, creamy and deceptively easy to drink.'},
      {id:'dom-pedro',icon:'🥤',name:'Dom Pedro',badge:'Dessert cocktail',text:'A boozy, milkshake-like South African dessert drink, commonly blending vanilla ice cream with whisky or a liqueur.',tip:'Order it instead of dessert, not as a light pre-dinner drink.'},
      {id:'springbokkie',icon:'🟢',name:'Springbokkie shot',badge:'Green + gold',text:'A layered green-and-gold shooter combining mint liqueur with a creamy marula-style liqueur.',tip:'Named for the Springboks colours; it is “Springbokkie,” even if someone casually says Springbok shot.'},
      {id:'brandy-coke',icon:'🥃',name:'Brandy & Coke',badge:'Local order',text:'A hugely familiar South African mixed-drink order: local brandy, cola and plenty of ice.',tip:'Ask for a single and pace it—the generous home-pour version can be considerably stronger.'},
      {id:'dry-cider',icon:'🍏',name:'South African dry cider',badge:'Easy sundowner',text:'A crisp bottled cider is a common warm-weather order; Savanna Dry is the best-known shorthand.',tip:'Serve it cold with lemon only if you like—the exact ritual inspires opinions.'},
      {id:'jagerbomb',icon:'💥',name:'Jägerbomb',badge:'International',text:'Jägermeister dropped into an energy drink. It is a global party shot, included for the group night out rather than local heritage.',tip:'High caffeine can mask how intoxicated you feel, so keep this firmly in the one-and-done category.'}
    ]
  }
];

let tastingState = JSON.parse(localStorage.getItem('tripTastingV1') || '{}');
const tastingItems = tastingGroups.flatMap(group => group.items);
function renderTastingList(){
  document.querySelector('#tryGroups').innerHTML = tastingGroups.map(group => `
    <section class="try-group">
      <div class="try-group__heading"><h3>${group.title}</h3><p>${group.intro}</p></div>
      <div class="try-grid">${group.items.map(item => `
        <label class="try-card ${tastingState[item.id] ? 'is-tried' : ''}">
          <input type="checkbox" data-tasting="${item.id}" ${tastingState[item.id] ? 'checked' : ''}>
          <span class="try-card__icon" aria-hidden="true">${item.icon}</span>
          <span class="try-card__copy">
            <span class="try-card__title"><strong>${item.name}</strong><small>${item.badge}</small></span>
            <span class="try-card__text">${item.text}</span>
            <span class="try-card__tip"><b>Try it:</b> ${item.tip}</span>
          </span>
        </label>
      `).join('')}</div>
    </section>
  `).join('');
  document.querySelectorAll('[data-tasting]').forEach(input => input.onchange = event => {
    tastingState[event.target.dataset.tasting] = event.target.checked;
    localStorage.setItem('tripTastingV1', JSON.stringify(tastingState));
    renderTastingList();
  });
  const done = tastingItems.filter(item => tastingState[item.id]).length;
  const percent = Math.round(done / tastingItems.length * 100);
  document.querySelector('#tryProgressLabel').textContent = `${done} of ${tastingItems.length} tried`;
  document.querySelector('#tryProgressPercent').textContent = `${percent}%`;
  document.querySelector('#tryProgressBar').style.width = `${percent}%`;
  document.querySelector('#tryProgressTrack').setAttribute('aria-valuemax', tastingItems.length);
  document.querySelector('#tryProgressTrack').setAttribute('aria-valuenow', done);
}
renderTastingList();
document.querySelector('#resetTryList').onclick = () => {
  if(confirm('Reset the Things to Try checklist?')){
    tastingState = {};
    localStorage.removeItem('tripTastingV1');
    renderTastingList();
  }
};

const fxCurrencies = {
  ZAR:{symbol:'R',locale:'en-ZA'},
  USD:{symbol:'$',locale:'en-US'},
  AUD:{symbol:'A$',locale:'en-AU'},
  EUR:{symbol:'€',locale:'en-IE'},
  GBP:{symbol:'£',locale:'en-GB'}
};
const fxAmount = document.querySelector('#fxAmount');
const fxFrom = document.querySelector('#fxFrom');
const fxTo = document.querySelector('#fxTo');
const fxResult = document.querySelector('#fxResult');
const fxStatus = document.querySelector('#fxStatus');
let fxRate = null;
let fxRateDate = '';
let fxRequest = 0;

function formatFxAmount(amount, currency){
  return new Intl.NumberFormat(fxCurrencies[currency].locale, {
    style:'currency',currency,minimumFractionDigits:2,maximumFractionDigits:2
  }).format(amount);
}
function formatFxDate(date){
  if(!date) return '';
  const parsed = new Date(`${date}T12:00:00Z`);
  return Number.isNaN(parsed.getTime()) ? date : new Intl.DateTimeFormat('en-US',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(parsed);
}
function renderFxQuickAmounts(){
  document.querySelector('#fxQuickAmounts').innerHTML = [100,500,1000,5000].map(amount => `<button type="button" data-fx-amount="${amount}">${fxCurrencies[fxFrom.value].symbol}${amount.toLocaleString('en-US')}</button>`).join('');
  document.querySelectorAll('[data-fx-amount]').forEach(button => button.onclick = () => {
    fxAmount.value = button.dataset.fxAmount;
    renderFxConversion();
  });
}
function renderFxConversion(){
  const amount = Number(fxAmount.value);
  const validAmount = Number.isFinite(amount) && amount >= 0;
  document.querySelector('#fxInputSymbol').textContent = fxCurrencies[fxFrom.value].symbol;
  document.querySelector('#fxResultLabel').textContent = validAmount ? `${amount.toLocaleString('en-US',{maximumFractionDigits:2})} ${fxFrom.value} converts to` : 'Enter a valid amount';
  if(!validAmount || fxRate === null){
    fxResult.textContent = fxRate === null ? 'Rate unavailable' : '—';
    document.querySelector('#fxRateLine').textContent = '';
    return;
  }
  fxResult.textContent = `${formatFxAmount(amount * fxRate, fxTo.value)} ${fxTo.value}`;
  document.querySelector('#fxRateLine').textContent = `1 ${fxFrom.value} = ${fxRate.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:6})} ${fxTo.value}`;
}
async function loadFxRate(force=false){
  const request = ++fxRequest;
  const from = fxFrom.value;
  const to = fxTo.value;
  renderFxQuickAmounts();
  fxStatus.className = '';
  if(from === to){
    fxRate = 1;
    fxRateDate = '';
    fxStatus.textContent = 'Same currency selected · no conversion needed';
    renderFxConversion();
    return;
  }
  fxRate = null;
  fxStatus.textContent = 'Fetching the latest reference rate…';
  renderFxConversion();
  const cacheKey = `tripFxRateV1:${from}:${to}`;
  try{
    const response = await fetch(`https://api.frankfurter.dev/v2/rate/${from.toLowerCase()}/${to.toLowerCase()}`, {cache:force ? 'reload' : 'default'});
    if(!response.ok) throw new Error(`Rate request failed: ${response.status}`);
    const data = await response.json();
    if(!Number.isFinite(Number(data.rate))) throw new Error('Rate response was incomplete');
    if(request !== fxRequest) return;
    fxRate = Number(data.rate);
    fxRateDate = data.date || '';
    localStorage.setItem(cacheKey, JSON.stringify({rate:fxRate,date:fxRateDate,savedAt:Date.now()}));
    fxStatus.textContent = `Reference rate dated ${formatFxDate(fxRateDate)}`;
    renderFxConversion();
  } catch(error){
    if(request !== fxRequest) return;
    const cached = JSON.parse(localStorage.getItem(cacheKey) || 'null');
    if(cached && Number.isFinite(Number(cached.rate))){
      fxRate = Number(cached.rate);
      fxRateDate = cached.date || '';
      fxStatus.className = 'is-cached';
      fxStatus.textContent = `Offline saved rate dated ${formatFxDate(fxRateDate)}`;
    } else {
      fxRate = null;
      fxStatus.className = 'is-error';
      fxStatus.textContent = 'Could not load a rate · check your connection and try Refresh';
    }
    renderFxConversion();
  }
}
fxAmount.addEventListener('input', renderFxConversion);
fxFrom.addEventListener('change', () => loadFxRate());
fxTo.addEventListener('change', () => loadFxRate());
document.querySelector('#fxSwap').onclick = () => {
  const previousFrom = fxFrom.value;
  fxFrom.value = fxTo.value;
  fxTo.value = previousFrom;
  loadFxRate();
};
document.querySelector('#fxRefresh').onclick = () => loadFxRate(true);
loadFxRate();

const lingoGroups = [
  {
    title:'Friendly conversation starters',
    intro:'Common, informal expressions worth recognising. The first four are especially easy for a visitor to use naturally.',
    items:[
      {term:'Howzit',say:'HOW-zit',origin:'South African English',use:'Easy to try',tone:'easy',meaning:'Hello, with a light “how are things?” built in.',us:'Closest to “Hey, how’s it going?” It usually works as a greeting, not a request for a detailed update.',example:'Howzit! How was the game drive?',source:'https://dsae.co.za/entry/howzit/e03125'},
      {term:'Lekker',say:'LEK-uh',origin:'Afrikaans',use:'Easy to try',tone:'easy',meaning:'Nice, great, pleasant, delicious or enjoyable.',us:'Much broader than “tasty.” A meal, view, day or experience can all be lekker.',example:'That was a lekker lunch.',source:'https://dsae.co.za/entry/lekker/e04283'},
      {term:'Sharp-sharp',say:'SHARP SHARP',origin:'South African English',use:'Easy to try',tone:'easy',meaning:'All good, agreed, hello or goodbye.',us:'A flexible “sounds good / all good / see you.” Keep it for casual conversation.',example:'Meet you at six? Sharp-sharp.',source:'https://www.oxfordlearnersdictionaries.com/us/definition/english/sharp-sharp'},
      {term:'Ja',say:'YAH',origin:'Afrikaans / Dutch',use:'Easy to try',tone:'easy',meaning:'Yes; also used to show that you heard or understood.',us:'It is a straightforward “yes,” pronounced yah—not a hesitant answer.',example:'Ja, that works for us.',source:'https://dsae.co.za/entry/ja/e03411'},
      {term:'Yebo',say:'YEH-boh',origin:'isiZulu',use:'Try naturally',tone:'listen',meaning:'Yes, I agree, or an acknowledgement.',us:'It began in isiZulu and is also used as a general term of assent. Listen to the setting and speaker first.',example:'Yebo, we’re ready.',source:'https://dsae.co.za/entry/yebo/e07960'},
      {term:'Eish',say:'AYSH',origin:'Tsotsitaal',use:'Listen, then try',tone:'listen',meaning:'An elastic reaction showing frustration, surprise, sympathy or resignation.',us:'Depending on tone, think “oof,” “wow,” or “oh no.” Context does most of the work.',example:'Eish, that rain came quickly.',source:'https://www.dsae.co.za/entry/eish/e10058'},
      {term:'Yoh!',say:'YOH',origin:'South African English',use:'Listen, then try',tone:'listen',meaning:'A reaction to surprise, awe, disbelief or something intense.',us:'A compact “whoa!” or “wow!”—handy for a dramatic view, price or story.',example:'Yoh, look at that view!',source:'https://files.su.ac.za/public/su-international/documents/2026-01/su-international-welcome-booklet-2026.pdf#page=36'},
      {term:'Ag shame',say:'ACH SHAME',origin:'Afrikaans-influenced English',use:'Know the nuance',tone:'listen',meaning:'An expression of sympathy, affection or delight at something endearing.',us:'Usually warmth, not blame. It does not mean the person should feel ashamed.',example:'Ag shame, that baby elephant is tiny.',source:'https://dsae.co.za/entry/shame/e06415'},
      {term:'Is it?',say:'IZ-it?',origin:'Afrikaans-influenced English',use:'Best to recognise',tone:'listen',meaning:'Really? Is that so? A conversational signal of interest or surprise.',us:'It can follow almost any statement, even where American grammar would suggest “are they?” or “did he?”',example:'“The road closes at five.” “Is it?”',source:'https://dsae.co.za/entry/is-it/e03364'}
    ]
  },
  {
    title:'The timing trap',
    intro:'These phrases are real scheduling hazards for visitors. If a pickup, booking or flight connection matters, confirm an exact clock time.',
    items:[
      {term:'Now-now',say:'NOW NOW',origin:'Afrikaans-influenced English',use:'Timing alert',tone:'alert',meaning:'In a moment or fairly soon; sometimes also a moment ago, depending on context.',us:'More urgent than “just now,” but it may still not mean this exact second.',example:'We’ll leave now-now.',source:'https://dsae.co.za/entry/nownow/e05259'},
      {term:'Just now',say:'JUST NOW',origin:'Afrikaans-influenced English',use:'Timing alert',tone:'alert',meaning:'In a while, presently or later; it can also retain the general-English meaning “a short while ago.”',us:'Do not automatically hear “immediately.” Ask “About what time?” when punctuality matters.',example:'I’ll bring the bill just now.',source:'https://dsae.co.za/entry/just-now/e03540'}
    ]
  },
  {
    title:'Road-trip decoder',
    intro:'Words likely to appear in directions, packing chat, meals and the long drives on this itinerary.',
    items:[
      {term:'Robot',say:'ROH-bot',origin:'South African English',use:'Useful to know',tone:'info',meaning:'A traffic light.',us:'“Turn left at the second robot” is a normal direction; no machines are involved.',example:'Go straight through the next robot.',source:'https://dsae.co.za/entry/robot/e06032'},
      {term:'Bakkie',say:'BUCK-ee / BACK-ee',origin:'Afrikaans',use:'Useful to know',tone:'info',meaning:'A pickup truck, light truck or 4×4.',us:'The closest American equivalent is “pickup.”',example:'The bags are in the bakkie.',source:'https://dsae.co.za/entry/bakkie/e00518'},
      {term:'Takkies',say:'TACK-ees',origin:'South African English',use:'Useful to know',tone:'info',meaning:'Sneakers, running shoes or other rubber-soled sports shoes.',us:'If someone says to bring takkies, they mean comfortable athletic shoes.',example:'Wear takkies for the walk.',source:'https://dsae.co.za/entry/tackie/e07050'},
      {term:'Braai',say:'BRY (rhymes with sky)',origin:'Afrikaans',use:'Easy to try',tone:'easy',meaning:'A barbecue, the grill or fire, the food, or the social gathering around it.',us:'It is more than swapping one word for “BBQ”; the shared fire and occasion are part of it.',example:'We’re having a braai tonight.',source:'https://dsae.co.za/entry/braai/e01198'},
      {term:'Jol',say:'JOLL',origin:'Afrikaans',use:'Casual',tone:'listen',meaning:'A party, a good time, or the act of going out and having fun.',us:'Roughly “a blast” or “to party.” Meaning can shift with context, so start by recognising it.',example:'The festival was a jol.',source:'https://dsae.co.za/entry/jol/e03505'},
      {term:'Padkos',say:'PUT-koss',origin:'Afrikaans',use:'Road-trip essential',tone:'info',meaning:'Food or snacks packed for a journey—literally road food.',us:'Think road-trip provisions: sandwiches, fruit, chips or biltong.',example:'Let’s grab some biltong for padkos.',source:'https://dsae.co.za/entry/padkos/e05484'}
    ]
  }
];

document.querySelector('#lingoGroups').innerHTML = lingoGroups.map(group => `
  <section class="lingo-group">
    <div class="lingo-group__heading"><h3>${group.title}</h3><p>${group.intro}</p></div>
    <div class="lingo-grid">${group.items.map(item => `
      <article class="lingo-card">
        <div class="lingo-card__top"><h4>${item.term}</h4><span class="lingo-pron">${item.say}</span></div>
        <div class="lingo-card__meta"><span>${item.origin}</span><span class="lingo-use lingo-use--${item.tone}">${item.use}</span></div>
        <p class="lingo-meaning">${item.meaning}</p>
        <p class="lingo-us"><strong>For Americans:</strong> ${item.us}</p>
        <div class="lingo-example"><small>IN THE WILD</small><span>${item.example}</span></div>
        <a href="${item.source}" target="_blank" rel="noopener">Check the source ↗</a>
      </article>
    `).join('')}</div>
  </section>
`).join('');

const mapPlaces = [
 ['Dainfern','Johannesburg family base',GOOGLE('Dainfern Johannesburg')],
 ['Kiara Lodge','Golden Gate',DIR('Kiara Lodge Golden Gate South Africa')],
 ['Victoria Falls','Shearwater / Falls',DIR("Shearwater's Explorers Village Victoria Falls")],
 ['Nelspruit Lodge','3 Webb Street, Nelspruit',DIR('Nelspruit Lodge 3 Webb Street Nelspruit South Africa')],
 ['Elephant Plains','Sabi Sand',DIR('Gowrie Gate Sabi Sand')],
 ['Hoedspruit Airport','Flight to Cape Town',DIR('Hoedspruit Airport')],
 ['Franschhoek','Roubaix Estate / Wine Tram',DIR('44 Cabriere Street Franschhoek')],
 ['Mountain Marina','V&A Waterfront',DIR('7 West Quay Road Cape Town')],
 ['Lanseria Airport','FlySafair arrival',DIR('Lanseria International Airport')],
 ['OR Tambo','Johannesburg airport',DIR('O. R. Tambo International Airport')]
];
document.querySelector('#mapLinks').innerHTML = mapPlaces.map(m => `<a class="map-link" target="_blank" rel="noopener" href="${m[2]}">${m[0]}<span>${m[1]} · open in Google Maps ↗</span></a>`).join('');

const risk = [
 ['Zimbabwe / Victoria Falls','Malaria prevention worth discussing','Victoria Falls is in a malaria-risk area. Speak to a travel-health clinician about prescription prevention, and be strict with repellent and dusk-to-dawn bite avoidance.','high'],
 ['Mpumalanga / Sabi Sand / Lowveld','Malaria prevention worth discussing','The Nelspruit / Sabi Sand portion of the trip is also malaria-risk country. This affects the Nelspruit / White River, Elephant Plains and Hoedspruit stretch.','high'],
 ['Johannesburg, Golden Gate, Franschhoek, Cape Town','No malaria risk typically highlighted for this itinerary section','Normal mosquito avoidance still helps comfort, but these parts of your route are not the malaria concern.','none']
];
document.querySelector('#riskStrip').innerHTML = risk.map(r => `<article class="risk-card risk-card--${r[3]}"><strong>${r[0]}</strong><p><b>${r[1]}</b><br>${r[2]}</p></article>`).join('');
const healthCards = [
 ['🦟','Malaria plan',[
  'Book a GP / travel-health appointment at least a month before travel where possible.','<strong>Tell the GP:</strong> malaria-risk exposure runs from 18–24 Jan 2027 — <strong>7 calendar days (6 nights)</strong> — covering Victoria Falls, Nelspruit / White River, Sabi Sand and departure from Hoedspruit.','<strong>The prescription course will be longer than 7 days.</strong> Current CDC schedules are: atovaquone–proguanil daily from 1–2 days before until 7 days after (about 15–16 days total for this itinerary); doxycycline daily from 1–2 days before until 4 weeks after (about 36–37 days total); or mefloquine weekly from at least 2 weeks before until 4 weeks after. The GP must choose the suitable medicine and exact dates.','Do not self-select medication; suitability depends on individual health, age, pregnancy status, interactions and contraindications.','Use repellent containing DEET or picaridin, long loose clothing after dusk and insect-proof / screened accommodation.','If you develop a fever during travel or after returning, seek medical care promptly and tell the clinician where you travelled.'
 ]],
 ['💉','Vaccines & medicines',[
  'Check routine vaccinations are current. CDC recommends Hepatitis A for unvaccinated travellers to both South Africa and Zimbabwe; Hepatitis B is also recommended for many travellers.','Carry enough prescription medication for the whole trip plus delays, ideally in original packaging with a copy of the prescription.','Avoid contact with stray dogs or wildlife. Seek urgent medical advice after any bite or scratch because rabies occurs in the region.'
 ]],
 ['🚗','Road & city safety',[
  'Smartraveller currently advises exercising a high degree of caution in both South Africa and Zimbabwe.','In South Africa, use major roads, keep doors locked / windows up, valuables out of sight and avoid driving after dark where possible.','Do not blindly accept GPS detours onto unfamiliar secondary roads; check locally first.','In Zimbabwe, road conditions, lighting and traffic can be poor; use registered / lodge-arranged transfers where practical.'
 ]],
 ['🥾','Hiking, wildlife & adventure',[
  'Hike in a group and in daylight, particularly on Table Mountain / Lion’s Head. Tell someone your route and expected return.','On safari, follow the guide’s instructions and never approach wildlife independently.','Check that travel insurance covers rafting, gorge swing, bungee, hiking and medical evacuation — adventure activities may be excluded by default.','Victoria Falls paths can be extremely wet and slippery in the wet season; use grippy footwear and protect phones / cameras.'
 ]],
 ['⛈️','January weather',[
  'January falls in the summer rainy season. Heavy thunderstorms and flash flooding can disrupt roads in South Africa; Zimbabwe’s rainy season can also make roads impassable.','Elephant Plains specifically warns that December–March road conditions can add substantial travel time. Build a conservative buffer for the 24 Jan transfer to Hoedspruit Airport.','Hydrate, use high-SPF sunscreen and carry a light rain shell / quick-dry layer.'
 ]],
 ['💳','Money, phones & documents',[
  'Avoid displaying large amounts of cash and use ATMs in controlled locations.','Zimbabwe commonly uses US dollars; small denominations are useful, while card / ATM reliability can vary outside major centres.','Keep passports, insurance details, booking confirmations and emergency contacts saved offline.','South Africa currently requires an online traveller declaration when entering or leaving; recheck this shortly before departure.'
 ]]
];
document.querySelector('#healthGrid').innerHTML = healthCards.map(c => `<article class="health-card"><div class="health-card__icon">${c[0]}</div><h3>${c[1]}</h3><ul>${c[2].map(x => `<li>${x}</li>`).join('')}</ul></article>`).join('');
const emergency = [['South Africa police / national emergency','10111'],['South Africa fire & rescue','10177'],['Zimbabwe police / fire / medical','999'],['Australian Consular Emergency Centre','+61 2 6261 3305']];
document.querySelector('#emergencyGrid').innerHTML = emergency.map(e => `<article class="emergency"><small>${e[0]}</small><strong>${e[1]}</strong></article>`).join('');
const healthSources = [['Smartraveller · South Africa','https://www.smartraveller.gov.au/destinations/africa/south-africa'],['Smartraveller · Zimbabwe','https://www.smartraveller.gov.au/destinations/africa/zimbabwe'],['CDC · South Africa','https://wwwnc.cdc.gov/travel/destinations/traveler/none/south-africa'],['CDC · Zimbabwe','https://wwwnc.cdc.gov/travel/destinations/traveler/none/zimbabwe/'],['CDC · Choosing malaria medication','https://www.cdc.gov/malaria/hcp/drug-malaria/index.html']];
document.querySelector('#healthSources').innerHTML = healthSources.map(s => `<a href="${s[1]}" target="_blank" rel="noopener">${s[0]} ↗</a>`).join('');

const packing = {
 'Travel essentials':['Passport + copies','Travel insurance details','Flight / accommodation confirmations saved offline','Driver licence','Universal travel adapter','Power bank + cables','Small daypack','Reusable water bottle'],
 'Clothing':['Breathable T-shirts / shirts','Shorts','Lightweight long trousers','One smart-casual outfit','Swimwear','Underwear / socks','Light fleece or warm layer','Light waterproof shell','Trail / walking shoes','Sandals / casual shoes','Wide-brim hat / cap'],
 'Safari + outdoors':['Neutral-colour safari layers','Binoculars','Sunglasses','High-SPF sunscreen','Insect repellent (DEET or picaridin)','Small torch / headlamp','Quick-dry clothing for Victoria Falls / rafting','Dry bag or waterproof phone pouch','Compact rain cover for daypack'],
 'Health + comfort':['Personal medications','Basic first-aid items','Motion-sickness option if you use one','Electrolyte sachets','Hand sanitiser','Earplugs + eye mask','Travel-health / malaria appointment completed'],
 'Food + social':['Small USD notes for Victoria Falls','Reusable tote for markets / padstals','Space for wine / food souvenirs subject to Australian biosecurity rules','Group dinner / activity booking notes'],
 'Useful extras':['eSIM / roaming plan','Offline maps downloaded','Shared group contact list','Emergency contacts saved','Laundry bag','Packable umbrella','Camera / spare memory card']
};
let packed = JSON.parse(localStorage.getItem('tripPackingV3') || '{}');
function renderPacking(){
  document.querySelector('#packingList').innerHTML = Object.entries(packing).map(([g,items]) => `
    <section class="packing-group"><h3>${g}</h3>${items.map(item => {
      const id = g + '|' + item;
      return `<label class="pack-item ${packed[id] ? 'is-packed' : ''}"><input type="checkbox" data-pack="${encodeURIComponent(id)}" ${packed[id] ? 'checked' : ''}><span>${item}</span></label>`;
    }).join('')}</section>`).join('');
  document.querySelectorAll('[data-pack]').forEach(el => el.onchange = e => {
    const id = decodeURIComponent(e.target.dataset.pack);
    packed[id] = e.target.checked;
    localStorage.setItem('tripPackingV3', JSON.stringify(packed));
    renderPacking();
  });
  const total = Object.values(packing).flat().length;
  const done = Object.values(packed).filter(Boolean).length;
  const pct = Math.round(done / total * 100);
  document.querySelector('#packingProgressBar').style.width = pct + '%';
  document.querySelector('#packingProgressLabel').textContent = `${done} of ${total} packed · ${pct}%`;
}
renderPacking();
document.querySelector('#resetPacking').onclick = () => { if(confirm('Reset the packing checklist?')) { packed = {}; localStorage.removeItem('tripPackingV3'); renderPacking(); } };

const sources = [
 ['Qantas e-ticket (uploaded)','8 Jan and 31 Jan / 1 Feb international flights.'],['Airlink e-ticket (uploaded)','18, 20 and 24 Jan regional flights.'],['FlySafair confirmation (uploaded)','29 Jan Cape Town → Lanseria flight for 2 adults.'],['Airbnb confirmation (uploaded)','24–26 Jan Franschhoek booking.'],['Booking.com Mountain Marina confirmation (uploaded)','26–29 Jan Cape Town booking.'],['Booking.com Shearwater confirmation (uploaded)','18–20 Jan Victoria Falls booking.'],['Booking.com Nelspruit Lodge confirmation (uploaded)','20–21 Jan Deluxe Double Room for 2 adults.'],['User-supplied','Dainfern, Kiara Lodge and Elephant Plains stay details; group size; confirmed game-lodge transfers.'],
 ['Kiara Lodge','https://www.kiaralodgeresort.co.za/'],['Elephant Plains','https://elephantplains.co.za/'],['Casterbridge Lifestyle Centre','https://www.casterbridgehollow.co.za/'],['Franschhoek Wine Tram','https://winetram.co.za/'],['Cape Town Tourism','https://www.capetown.travel/'],['Marine Dynamics · shark cage diving','https://sharkwatchsa.com/shark-cage-diving-cape-town/'],['Bo-Kaap Tours','https://www.bokaaptours.com/tours'],['Atlantic Outlook · hikes and kayaking','https://www.atlanticoutlook.com/'],['Animal Ocean · ocean safari','https://www.animalocean.co.za/ocean-safari-kelp-snorkeling-cape-town'],['Cape Town Tandem Paragliding','https://www.paraglide.co.za/'],['Wanderer · private Cape Peninsula tour','https://wanderer.capetown/cape-town-day-tours/cape-point-tour/'],['Robben Island Museum','https://www.robben-island.org.za/tour-types/'],['South African Tourism · iconic foods','https://www.southafrica.net/gl/en/travel/article/iconic-south-african-foods-taste-all-the-flavours-of-the-rainbow-nation'],['South African Tourism · food & drink','https://www.southafrica.net/uk/en/travel/category/meet-your-south-africa/food-drink'],['Frankfurter exchange-rate API','https://frankfurter.dev/'],['Dictionary of South African English','https://dsae.co.za/'],['Stellenbosch University International Welcome Booklet 2026','https://files.su.ac.za/public/su-international/documents/2026-01/su-international-welcome-booklet-2026.pdf#page=36'],['Oxford Learner’s Dictionaries · sharp-sharp','https://www.oxfordlearnersdictionaries.com/us/definition/english/sharp-sharp'],['Smartraveller · South Africa','https://www.smartraveller.gov.au/destinations/africa/south-africa'],['Smartraveller · Zimbabwe','https://www.smartraveller.gov.au/destinations/africa/zimbabwe'],['CDC · South Africa','https://wwwnc.cdc.gov/travel/destinations/traveler/none/south-africa'],['CDC · Zimbabwe','https://wwwnc.cdc.gov/travel/destinations/traveler/none/zimbabwe/'],['CDC · Choosing malaria medication','https://www.cdc.gov/malaria/hcp/drug-malaria/index.html']
];
const dialog = document.querySelector('#detailDialog');
const content = document.querySelector('#dialogContent');
document.querySelector('.dialog__close').onclick = () => dialog.close();
document.querySelector('#sourcesButton').onclick = () => {
  content.innerHTML = `<div class="dialog__inner"><div class="eyebrow eyebrow--dark">SOURCES & ASSUMPTIONS</div><h2>What this planner is based on</h2><p>Confirmed reservations come from the uploaded booking documents or details you supplied. Activity, food, language, map and health/safety information uses public information checked on 26 Sep 2026; the tasting list and FX implementation were checked on 4 Oct 2026; Cape Town activity and operator details were checked on 5 Oct 2026; the latest booking status was checked on 7 Oct 2026.</p><ul class="source-list">${sources.map(s => `<li>${String(s[1]).startsWith('http') ? `<a href="${s[1]}" target="_blank" rel="noopener">${s[0]} ↗</a>` : `<strong>${s[0]}</strong> — ${s[1]}`}</li>`).join('')}</ul><h3>Assumptions</h3><ul><li>The remaining eight travellers join at Victoria Falls on 18 Jan.</li><li>The group is treated as 10 through the Cape Town stay; the Nelspruit Lodge and FlySafair confirmations each cover 2 adults.</li><li>Only the Cape Town Airport → Franschhoek and Franschhoek → Mountain Marina transfers remain to arrange.</li><li>Cape Town travel times start and end at Mountain Marina in the V&A Waterfront and are estimates, not booking guarantees.</li><li>Wine Tram routes/times, activity operating conditions and health/travel advice must be reconfirmed closer to January 2027.</li></ul></div>`;
  dialog.showModal();
};

function initHorizontalScrollers(){
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-horizontal-scroller]').forEach(shell => {
    const viewport = shell.querySelector('[data-scroll-viewport]');
    const previous = shell.querySelector('[data-scroll-prev]');
    const next = shell.querySelector('[data-scroll-next]');
    const cue = shell.querySelector('.scroll-cue');
    const label = shell.querySelector('[data-scroll-label]');
    const thumb = shell.querySelector('[data-scroll-thumb]');
    if(!viewport || !previous || !next) return;

    const update = () => {
      const max = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      const position = Math.max(0, Math.min(max, viewport.scrollLeft));
      const overflowing = max > 4;
      const atStart = !overflowing || position <= 2;
      const atEnd = !overflowing || position >= max - 2;
      shell.classList.toggle('is-overflowing', overflowing);
      shell.classList.toggle('is-at-start', atStart);
      shell.classList.toggle('is-at-end', atEnd);
      previous.disabled = atStart;
      next.disabled = atEnd;

      if(label && cue){
        label.textContent = atStart ? cue.dataset.labelStart : atEnd ? cue.dataset.labelEnd : cue.dataset.labelMiddle;
      }
      if(thumb){
        const thumbWidth = overflowing ? Math.max(18, (viewport.clientWidth / viewport.scrollWidth) * 100) : 100;
        const thumbLeft = overflowing ? (position / max) * (100 - thumbWidth) : 0;
        thumb.style.width = `${thumbWidth}%`;
        thumb.style.left = `${thumbLeft}%`;
      }
    };

    const move = direction => viewport.scrollBy({
      left: direction * Math.max(160, viewport.clientWidth * .72),
      behavior: reducedMotion ? 'auto' : 'smooth'
    });
    previous.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    viewport.addEventListener('scroll', update, {passive:true});
    viewport.addEventListener('keydown', event => {
      if(event.target !== viewport || !['ArrowLeft','ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    });
    if('ResizeObserver' in window) new ResizeObserver(update).observe(viewport);
    else window.addEventListener('resize', update);
    shell.updateScrollAffordance = update;
    requestAnimationFrame(update);
  });
}

function activateSection(id){
  document.querySelectorAll('.page').forEach(p => p.classList.toggle('is-active', p.id === id));
  let activeTab;
  document.querySelectorAll('.tab').forEach(t => {
    const active = t.dataset.section === id;
    t.classList.toggle('is-active', active);
    if(active){
      t.setAttribute('aria-current','page');
      activeTab = t;
    } else {
      t.removeAttribute('aria-current');
    }
  });
  activeTab?.scrollIntoView({block:'nearest',inline:'center',behavior:'smooth'});
  window.scrollTo({top:document.querySelector('.tabs').offsetTop,behavior:'smooth'});
}
document.querySelectorAll('.tab').forEach(t => t.onclick = () => activateSection(t.dataset.section));
document.querySelectorAll('[data-jump]').forEach(b => b.onclick = () => activateSection(b.dataset.jump));
initHorizontalScrollers();
if('serviceWorker' in navigator && location.protocol.startsWith('http')){
  let refreshingForUpdate = false;
  navigator.serviceWorker.addEventListener('controllerchange',() => {
    if(refreshingForUpdate) return;
    refreshingForUpdate = true;
    window.location.reload();
  });
  navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(registration => registration.update()).catch(() => {});
}
