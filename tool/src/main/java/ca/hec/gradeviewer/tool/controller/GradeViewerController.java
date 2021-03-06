package ca.hec.gradeviewer.tool.controller;

import org.sakaiproject.exception.IdUnusedException;
import org.sakaiproject.user.api.UserNotDefinedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import ca.hec.gradeviewer.GradeViewerService;
import ca.hec.gradeviewer.entity.User;
import ca.hec.gradeviewer.tool.entity.GradesResponse;
import ca.hec.gradeviewer.tool.exception.SecurityException;

@Controller
public class GradeViewerController {

	@Autowired
	private GradeViewerService gradeViewerService;

	@RequestMapping(value = "/grades/{matricule}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody GradesResponse getUserGrades(@PathVariable(value = "matricule") String matricule) throws SecurityException {
		try {
			if (!gradeViewerService.isUserAllowed()) {
				throw new SecurityException("User is not allowed");
			}

			User user = gradeViewerService.getUserByMatricule(matricule);

			return new GradesResponse(user, gradeViewerService.getUserCourses(user));
		} catch (IdUnusedException e) {
			return new GradesResponse(GradesResponse.ERROR_INVALID_USER);
		} catch (UserNotDefinedException e) {
			return new GradesResponse(GradesResponse.ERROR_INVALID_USER);
		}
	}
}
