package ca.hec.gradeviewer.tool.controller;

import org.sakaiproject.user.api.User;
import org.sakaiproject.user.api.UserNotDefinedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.JsonProcessingException;

import ca.hec.gradeviewer.api.GradeViewerService;
import ca.hec.gradeviewer.tool.entities.GradesResponse;

@Controller
public class GradeViewerController {

	@Autowired
	private GradeViewerService gradeViewerService;

	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public ModelAndView getIndexPage() throws UserNotDefinedException, JsonProcessingException {
		return new ModelAndView("index");
	}

	@RequestMapping(value = "/{matricule}/grades", method = RequestMethod.GET)
	public @ResponseBody GradesResponse getUserGrades(@PathVariable(value = "matricule") String matricule)
			throws UserNotDefinedException {
		User user = gradeViewerService.getUserByMatricule(matricule);

		GradesResponse ret = new GradesResponse();

		ret.setUserId(user.getId());
		ret.setAssignments(gradeViewerService.getUserAssignments(user));

		return ret;
	}
}
