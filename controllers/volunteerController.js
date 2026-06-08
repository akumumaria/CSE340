const volunteerModel = require('../src/models/volunteers');
const { requireLogin } = require('./usersController');

/**
 * Add the current user as a volunteer for a project
 */
async function addVolunteerToProject(req, res) {
  try {
    const projectId = req.params.id;
    const userId = req.session.user.user_id;

    // Check if user is already volunteering
    const isAlreadyVolunteering = await volunteerModel.isUserVolunteering(userId, projectId);
    
    if (isAlreadyVolunteering) {
      req.flash('info', 'You are already volunteering for this project.');
      return res.redirect('/project/' + projectId);
    }

    await volunteerModel.addVolunteer(userId, projectId);
    req.flash('success', 'You have successfully volunteered for this project!');
    res.redirect('/project/' + projectId);
  } catch (error) {
    console.error('[ERROR addVolunteerToProject]', error.message, error.stack);
    req.flash('error', 'Failed to volunteer for project.');
    res.redirect('/project/' + req.params.id);
  }
}

/**
 * Remove the current user as a volunteer from a project
 */
async function removeVolunteerFromProject(req, res) {
  try {
    const projectId = req.params.id;
    const userId = req.session.user.user_id;

    const wasRemoved = await volunteerModel.removeVolunteer(userId, projectId);
    
    if (wasRemoved) {
      req.flash('success', 'You have been removed as a volunteer from this project.');
    } else {
      req.flash('info', 'You were not volunteering for this project.');
    }
    
    res.redirect('/project/' + projectId);
  } catch (error) {
    console.error('[ERROR removeVolunteerFromProject]', error.message, error.stack);
    req.flash('error', 'Failed to remove volunteer status.');
    res.redirect('/project/' + req.params.id);
  }
}

/**
 * Remove the current user as a volunteer from a project (from dashboard)
 */
async function removeVolunteerFromDashboard(req, res) {
  try {
    const projectId = req.params.id;
    const userId = req.session.user.user_id;

    const wasRemoved = await volunteerModel.removeVolunteer(userId, projectId);
    
    if (wasRemoved) {
      req.flash('success', 'You have been removed as a volunteer from this project.');
    } else {
      req.flash('info', 'You were not volunteering for this project.');
    }
    
    res.redirect('/dashboard');
  } catch (error) {
    console.error('[ERROR removeVolunteerFromDashboard]', error.message, error.stack);
    req.flash('error', 'Failed to remove volunteer status.');
    res.redirect('/dashboard');
  }
}

module.exports = {
  addVolunteerToProject,
  removeVolunteerFromProject,
  removeVolunteerFromDashboard
};
