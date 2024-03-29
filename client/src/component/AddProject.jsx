import { useContext, useState, useRef, useEffect } from 'react';
import projectContext from '../context/projectContext';
import PropTypes from 'prop-types';

function AddProject(props) {
    const context = useContext(projectContext);
    // Destructure the addProject from context
    const { addProject } = context;

    const [project, setProject] = useState({ title: "", description: "", gitHubLink: "", youTubeLink: "" });
    const refClose = useRef(null);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission on Enter key press
            handleClick(); // Manually handle the click event
        }
    }

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "Enter" && project.title.trim() !== "") {
                handleClick();
            }
        };

        document.addEventListener("keypress", handleKeyPress);

        return () => {
            document.removeEventListener("keypress", handleKeyPress);
        };
        // eslint-disable-next-line
    }, [project.title]); // Only re-run the effect if project.title changes

    const handleClick = () => {
        if (project.title.trim() === "") {
            props.showAlert("Title is required", "danger");
            return;
        }
        // Add project API call
        addProject(project.title, project.description, project.gitHubLink, project.youTubeLink);
        refClose.current.click();
        setProject({ title: "", description: "", gitHubLink: "", youTubeLink: "" });
        props.showAlert("Project Added Successfully", "success");
    };

    const onChange = (e) => {
        // Able to write in the input field
        setProject({ ...project, [e.target.name]: e.target.value });
    };
    return (
        <div>
            <button type="button" className="btn Navbar-Btn mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Upload
            </button>

            <div className="modal fade text-start" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Upload Project</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="pro-card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Project Title</label>
                                        <input autoFocus type="text" className="form-control" id="title" name='title' value={project.title} onChange={onChange} placeholder="Enter Project Title Here *" required onKeyDown={handleKeyDown} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Project Description</label>
                                        <textarea type="text" className="form-control" id="description" name='description' value={project.description} onChange={onChange} placeholder="Enter Project Description Here" rows="3" onKeyDown={handleKeyDown}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="gitHubLink" className="form-label">Github Link</label>
                                        <input type="text" className="form-control" id="gitHubLink" name='gitHubLink' value={project.gitHubLink} onChange={onChange} placeholder="Enter Github Link Here" onKeyDown={handleKeyDown} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="youTubeLink" className="form-label">YouTube Link</label>
                                        <input type="text" className="form-control" id="youTubeLink" name='youTubeLink' value={project.youTubeLink} onChange={onChange} placeholder="Enter YouTube Link Here" onKeyDown={handleKeyDown} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={project.title.trim() === ""} type="button" className="btn btn-primary" onClick={handleClick}>Upload</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

AddProject.propTypes = {
    showAlert: PropTypes.func,
};

export default AddProject;
