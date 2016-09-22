package ca.hec.gradeviewer.tool.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import ca.hec.gradeviewer.api.GradeViewerService;

@Controller
public class GradeViewerController {

	@Autowired
	private GradeViewerService gradeViewerService;
	
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public ModelAndView getIndexPage()
	{
		ModelAndView ret = new ModelAndView("index");
		
		ret.addObject("message", gradeViewerService.getMessage());
		
		return ret;
	}
}
