import "../styles/List.css";

const List = () => {
    return (
        <div>
            {/* table 1 */}
            <div className='training-id-name'>
                <div className='flexdiv' id='box1'>
                    <div className='flexi'><span id='training-id'>Training ID:</span> <span className='heading1'>23</span></div>
                    <div className='flexi'><span id='training-start'>Start Date:</span> <span className='heading2'>10-02-2022</span></div>
                </div>
                <div className='flexdiv' id='box2'>
                    <div className='flexi'><span id='training-name'>Training Name:</span > <span className='heading1'>Sayan Pramanick</span> </div>
                    <div className='flexi'><span id='training-end'>End Date:</span> <span id='xo' className='heading2'>10-02-2023</span> </div>
                </div>
            </div>
            {/* table 2 */}
            <div className='student-table'>

                {/* Table heading */}
                <div className='table-heading'>
                    <div className='hslno'>S.No.</div>
                    <div className='hsid'>Student ID</div>
                    <div className='hsname'>Student Name</div>
                    <div className='hexp'>Total Experience</div>
                    <div className='h-stack'>Tech Stack</div>
                    <div className='hremark'>Expectations from training</div>
                </div>

                {/* Table Data */}
                <div className='table-data'>

                    {/* table-card Components */}
                    <div className='table-card'>
                        <div className='hslno'>1</div>
                        <div className='hsid'>130887</div>
                        <div className='hsname'>Sayan Pramanick</div>
                        <div className='hexp'>3</div>
                        <div className='h-stack'>MERN</div>
                        <div className='hremark'>Great</div>
                    </div>

                    <div className='table-card'>
                        <div className='hslno'>2</div>
                        <div className='hsid'>130886</div>
                        <div className='hsname'>Lakshay Arora</div>
                        <div className='hexp'>4</div>
                        <div className='h-stack'>MERN</div>
                        <div className='hremark'>Average</div>
                    </div>

                    <div className='table-card'>
                        <div className='hslno'>3</div>
                        <div className='hsid'>130866</div>
                        <div className='hsname'>Rohit Raju</div>
                        <div className='hexp'>2</div>
                        <div className='h-stack'>MERN</div>
                        <div className='hremark'>Great</div>
                    </div>
                    <div className='table-card'>
                        <div className='hslno'>3</div>
                        <div className='hsid'>130866</div>
                        <div className='hsname'>Rohit Raju</div>
                        <div className='hexp'>2</div>
                        <div className='h-stack'>MERN</div>
                        <div className='hremark'>Great</div>
                    </div>
                    <div className='table-card'>
                        <div className='hslno'>3</div>
                        <div className='hsid'>130866</div>
                        <div className='hsname'>Rohit Raju</div>
                        <div className='hexp'>2</div>
                        <div className='h-stack'>MERN</div>
                        <div className='hremark'>Great</div>
                    </div>
                    <div className='table-card'>
                        <div className='hslno'>3</div>
                        <div className='hsid'>130866</div>
                        <div className='hsname'>Rohit Raju</div>
                        <div className='hexp'>2</div>
                        <div className='h-stack'>MERN</div>
                        <div className='hremark'>Great</div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default List;