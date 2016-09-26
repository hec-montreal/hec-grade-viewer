package ca.hec.gradeviewer.impl;

import java.util.ArrayList;
import java.util.List;

import org.sakaiproject.service.gradebook.shared.Assignment;
import org.sakaiproject.service.gradebook.shared.GradebookService;
import org.sakaiproject.site.api.Site;
import org.sakaiproject.site.api.SiteService;
import org.sakaiproject.user.api.User;
import org.sakaiproject.user.api.UserDirectoryService;
import org.sakaiproject.user.api.UserNotDefinedException;

import ca.hec.gradeviewer.api.AssignmentWithGrade;
import ca.hec.gradeviewer.api.Grade;
import ca.hec.gradeviewer.api.GradeViewerService;

public class GradeViewerServiceImpl implements GradeViewerService {

	private UserDirectoryService userDirectoryService = null;

	private SiteService siteService = null;

	private GradebookService gradebookService = null;

	@Override
	public User getUserByMatricule(String matricule) throws UserNotDefinedException {
		return userDirectoryService.getUserByEid(matricule);
	}

	@Override
	public List<Site> getUserSites(User user) {
		return siteService.getUserSites(true, user.getId());
	}

	@Override
	public List<AssignmentWithGrade> getUserAssignments(User user) {
		List<AssignmentWithGrade> ret = new ArrayList<>();

		List<Site> sites = getUserSites(user);

		for (Site site : sites) {
			if (!gradebookService.isGradebookDefined(site.getId())) {
				continue;
			}

			List<Assignment> assignments = gradebookService.getAssignments(site.getId());

			for (Assignment assignment : assignments) {
				Grade grade = new GradeImpl(
						gradebookService.getAssignmentScoreString(site.getId(), assignment.getId(), user.getId()));

				ret.add(new AssignmentWithGradeImpl(new AssignmentImpl(assignment), grade));
			}
		}

		return ret;
	}

	public void setUserDirectoryService(UserDirectoryService userDirectoryService) {
		this.userDirectoryService = userDirectoryService;
	}

	public void setSiteService(SiteService siteService) {
		this.siteService = siteService;
	}

	public void setGradebookService(GradebookService gradebookService) {
		this.gradebookService = gradebookService;
	}
}
